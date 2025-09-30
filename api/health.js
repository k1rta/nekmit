/* eslint-env node */
/* eslint-disable no-undef */
// Vercel serverless function: /api/health (CommonJS)

module.exports = async function handler(req, res) {
  try {
    // 1) Prefer commit SHA from common CI env vars
    const sha =
      process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_SHA || '';

    let version = (sha || '').slice(0, 7);

    // 2) Fallback to package.json version if no SHA
    if (!version) {
      try {
         
        const pkg = require('../package.json');
        version = pkg && pkg.version ? String(pkg.version) : '';
      } catch {
        /* no-op: package.json may be unreadable in some runtimes */
      }
    }

    // 3) Final fallback
    if (!version) version = 'unknown';

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
