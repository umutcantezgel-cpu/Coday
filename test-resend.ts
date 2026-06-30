import { loadEnvConfig } from '@next/env';
import path from 'path';

loadEnvConfig(path.join(process.cwd(), '.'));

async function test() {
  const { saveLeadInternalAction } =
    await import('./src/features/contact/actions/saveLeadInternal.ts');

  console.log('Testing saveLeadInternalAction...');

  const result = await saveLeadInternalAction({
    name: 'Test Goal User',
    email: 'test@example.com',
    phone: '123456789',
    message: 'Testing if Resend works.',
    project: 'Debug Goal',
    source: 'test_script',
  });

  console.log('Result:', result);
}

test().catch(console.error);
