import { Resend } from 'resend';
const resend = new Resend('re_U47SSVtg_M7fHNuoTq41u1kFU3kEBRqZ5');
async function test() {
  try {
    const data = await resend.emails.send({
      from: 'Coday Contact <onboarding@resend.dev>',
      to: ['umutcantezgel@gmail.com'],
      subject: 'Test mit dem alten Key',
      html: '<p>Dieser Test prüft, ob der ALTE Key funktioniert.</p>',
    });
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
test();
