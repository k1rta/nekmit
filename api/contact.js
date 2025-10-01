/* eslint-env node */
/* eslint-disable no-undef */
// Vercel serverless function: /api/contact (POST)
// Accepts JSON: { name, email, message } and sends via Resend

module.exports = async function handler(req, res) {
  // CORS for simple demo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (!body) {
    try {
      // Fallback: try reading raw body if not parsed (depends on platform)
      body = {};
    } catch {
      body = {};
    }
  }

  const name = (body && body.name ? String(body.name) : '').trim();
  const email = (body && body.email ? String(body.email) : '').trim();
  const message = (body && body.message ? String(body.message) : '').trim();

  const errors = [];
  if (!name) errors.push('name');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');
  if (!message || message.length < 5) errors.push('message');

  if (errors.length) {
    res.status(400).json({ status: 'error', message: 'Invalid fields', fields: errors });
    return;
  }

  // Send email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const TO_EMAIL = process.env.TO_EMAIL;

  if (!RESEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
    res.status(500).json({
      status: 'error',
      message:
        'Email not configured. Set RESEND_API_KEY, FROM_EMAIL, and TO_EMAIL environment variables.',
    });
    return;
  }

  // Lazy require to keep CommonJS and lint happy
   
  const { Resend } = require('resend');
  const resend = new Resend(RESEND_API_KEY);

  const subject = `New contact from ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.4;">
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      <pre style="white-space:pre-wrap;">${escapeHtml(message)}</pre>
    </div>
  `;

  try {
    await resend.emails.send({ from: FROM_EMAIL, to: TO_EMAIL, subject, text, html });
    res.status(200).json({ status: 'ok', sent: true });
  } catch (err) {
    res
      .status(502)
      .json({
        status: 'error',
        message: 'Email send failed',
        detail: String(err && err.message ? err.message : err),
      });
  }
};

// Minimal HTML escape for email body safety
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
