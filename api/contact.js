/* eslint-env node */
/* eslint-disable no-undef */
// Vercel serverless function: /api/contact (POST)
// Accepts JSON: { name, email, message }

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

  // Demo: pretend to persist by logging (Vercel logs)
  console.log('Contact message:', { name, email, message: message.slice(0, 200) });

  res.status(200).json({ status: 'ok', received: { name, email }, length: message.length });
};
