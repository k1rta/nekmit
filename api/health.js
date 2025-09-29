/* eslint-env node */
/* eslint-disable no-undef */
// Vercel serverless function: /api/health (CommonJS)

module.exports = async function handler(req, res) {
  try {
    const version =
      (process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || '').slice(0, 7) || 'unknown';
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'ok',
      version,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ status: 'error', message: (e && e.message) || 'unknown' });
  }
};
