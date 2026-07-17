'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { calculateLeadScore, leadFormSchema } from '../schema/lead';

export async function submitLeadAction(prevState: unknown, formData: FormData) {
  const supabase = createAdminClient();
  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;
  try {
    // 1. Verify Turnstile
    const token = formData.get('cf-turnstile-response');
    if (process.env.NODE_ENV === 'production') {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return { success: false, error: 'Anti-bot verification failed.' };
      }
    }

    // 2. Parse and Validate
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      timeframe: formData.get('timeframe'),
      description: formData.get('description'),
      source: formData.get('source'),
      privacyAccepted: formData.get('privacyAccepted') === 'true',
      address_line_2: formData.get('address_line_2'), // honeypot
    };

    const parsedData = leadFormSchema.parse(rawData);

    // Honeypot check
    if (parsedData.address_line_2) {
      // Silently accept but drop for bots
      return { success: true };
    }

    // 3. Lead Scoring
    const score = calculateLeadScore(parsedData);

    // 4. Save to Supabase (Fire and forget / Non-blocking)
    const { error: dbError } = await supabase.from('leads').insert([
      {
        name: parsedData.name,
        email: parsedData.email,
        company: parsedData.company,
        phone: parsedData.phone,
        project: parsedData.projectType,
        budget: parsedData.budget,
        timeline: parsedData.timeframe,
        message: parsedData.description,
        source: parsedData.source,
      },
    ]);

    if (dbError) {
      console.error('Supabase Error (Ignored, proceeding to email):', dbError);
    }

    // 5. Send Email via Resend
    if (resend) {
      const { data, error: emailError } = await resend.emails.send({
        from: 'Coday Leads <leads@codayweb.de>',
        to: ['umut@codayweb.de'],
        subject: `New Lead: ${parsedData.name} (Score: ${score})`,
        text: `
Name: ${parsedData.name}
Email: ${parsedData.email}
Company: ${parsedData.company}
Project: ${parsedData.projectType}
Budget: ${parsedData.budget}
Timeframe: ${parsedData.timeframe}
Description: ${parsedData.description}
Score: ${score}
        `,
      });

      if (emailError) {
        console.error('Resend Email Error:', emailError);
      } else {
        console.log('Resend Email Success:', data);
      }
    } else {
      console.warn('RESEND_API_KEY is not set, skipping email.');
    }

    // 6. Slack Webhook (if high score)
    if (score >= 7 && process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚀 *HOT LEAD ALERT* (Score: ${score})\nName: ${parsedData.name}\nBudget: ${parsedData.budget}\nTimeframe: ${parsedData.timeframe}`,
        }),
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation error' };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
