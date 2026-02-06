import { Resend } from 'resend';
import { LeadApiSchema } from '../src/shared/lib/validation/schemas';
import { z } from 'zod';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logValidationFailure, logSecurityEvent, SecurityEventType } from '../src/shared/lib/security/logger';

// Initialize Resend with API Key from env
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Validate request body
        const validatedData = LeadApiSchema.parse(req.body);
        const { name, email, message, phone, project, source } = validatedData;

        const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
        const recipientEmail = process.env.RECIPIENT_EMAIL || 'umut@codayweb.de';

        const { data, error } = await resend.emails.send({
            from: `Agency Domination <${senderEmail}>`,
            to: [recipientEmail],
            subject: `Neuer Lead von ${name}: ${project || 'Anfrage'}`,
            html: `
        <h1>Neue Anfrage erhalten</h1>
        <p><strong>Quelle:</strong> ${source || 'Unknown'}</p>
        <h2>Kontakt</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Firma:</strong> ${validatedData.company || 'Nicht angegeben'}</li>
          <li><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</li>
        </ul>
        <h2>Details</h2>
        <p><strong>Projektart:</strong> ${project}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return res.status(400).json(error);
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodErrors = (error as any).errors;
            logValidationFailure(
                'api/send-lead',
                zodErrors.map((e: any) => ({ path: String(e.path[0]), message: e.message })),
                (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown'
            );
            return res.status(400).json({ message: 'Validation failed', errors: zodErrors });
        }

        logSecurityEvent({
            eventType: SecurityEventType.SECURITY_EXCEPTION,
            message: 'Email sending failed',
            source: 'api/send-lead',
            metadata: { error: String(error) }
        });

        console.error('Email sending failed:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
