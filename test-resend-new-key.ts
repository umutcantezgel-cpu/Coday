import { Resend } from 'resend';
const resend = new Resend('re_ZibmxaTk_GR5YyJjgFQwPord7TfphiWHG');
async function test() {
  try {
    const data = await resend.emails.send({
      from: 'Coday Contact <onboarding@resend.dev>',
      to: ['umutcantezgel@gmail.com'],
      subject: 'Test mit dem neuen Vercel Key',
      html: '<p>Dieser Test prüft, ob der in Vercel hinterlegte Key funktioniert.</p>',
    });
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
