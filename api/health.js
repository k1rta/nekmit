/* eslint-env node */
/* eslint-disable no-undef */

module.exports = async function handler(req, res) {
  try {
    // 1) Prefer commit SHA from common CI env vars
    const sha =
      process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_SHA || '';

    let commitSha = (sha || '').slice(0, 7);

    // 2) Fallback to package.json version if no SHA
    let version = '';
    if (!commitSha) {
      try {
         
        const pkg = require('../package.json');
        version = pkg && pkg.version ? String(pkg.version) : '';
      } catch {
        /* no-op: package.json may be unreadable in some runtimes */
      }
    }

    // 3) Final fallback
    if (!commitSha) commitSha = 'unknown';
    if (!version) version = 'unknown';

    const now = new Date();
    // Produce a Tallinn-local timestamp string
    const tallinn = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Europe/Tallinn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .format(now)
      .replace(' ', 'T');

    let env = process.env.VERCEL_ENV || process.env.NODE_ENV || '';
    const region = process.env.VERCEL_REGION || (process.env.VERCEL ? 'dev1' : 'local');
    if (!env) {
      env =
        region === 'dev1' || process.env.NODE_ENV !== 'production' ? 'development' : 'production';
    }
    const commitRef = process.env.VERCEL_GIT_COMMIT_REF || '';
    const uptimeSec = Math.round(process.uptime() * 100) / 100;
    // Generate a short request id for tracing
    let requestId = '';
    try {
       
      const { randomUUID } = require('crypto');
      requestId = (typeof randomUUID === 'function' ? randomUUID() : '') || '';
    } catch {
      requestId = '';
    }
    if (!requestId) {
      requestId = Math.random().toString(36).slice(2, 10);
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'ok',
      requestId,
      version, // package.json version when available
      commitSha,
      commitRef,
      env,
      region,
      serverTimeUtc: now.toISOString(),
      serverTimeTallinn: tallinn,
      uptimeSec,
    });
  } catch (e) {
    res.status(500).json({ status: 'error', message: (e && e.message) || 'unknown' });
  }
};
