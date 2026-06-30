import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY || 're_U47SSVtg_M7fHNuoTq41u1kFU3kEBRqZ5';
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Coday Contact <onboarding@resend.dev>';
    const ADMIN_EMAIL = 'umutcantezgel@gmail.com';

    const resend = new Resend(resendApiKey);

    const adminRes = await resend.emails.send({
      from: EMAIL_FROM,
      to: [ADMIN_EMAIL],
      subject: `Test from Vercel`,
      html: `<p>Testing Resend on Vercel.</p>`,
    });

    if (adminRes.error) {
      return NextResponse.json({ success: false, error: adminRes.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: adminRes.data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, catchError: error?.message || String(error) },
      { status: 500 }
    );
  }
}
