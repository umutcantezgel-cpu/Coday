import { NextResponse } from 'next/server';
import { saveLeadInternalAction } from '@/features/contact/actions/saveLeadInternal';

export async function GET(request: Request) {
  try {
    const result = await saveLeadInternalAction({
      name: 'Test Goal User Prod',
      email: 'test@example.com',
      phone: '123456789',
      message: 'Testing if Resend works in production.',
      project: 'Debug Goal Prod',
      source: 'test_script_prod',
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: String(error), stack: error.stack },
      { status: 500 }
    );
  }
}
