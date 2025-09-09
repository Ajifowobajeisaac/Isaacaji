export async function SendEmail({ name, email, subject, message }) {
  // Stub: emulate async email send
  console.log('SendEmail stub called with:', { name, email, subject, message });
  await new Promise(r => setTimeout(r, 300));
  return { ok: true };
}
