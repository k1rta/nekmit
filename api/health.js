// Vercel serverless function: /api/health

export default async function handler(req, res) {
  try {
    const pkg = await import('../package.json', { assert: { type: 'json' } })
      .then((m) => m.default)
      .catch(() => ({ version: '0.0.0' }));
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'ok',
      version: pkg.version || '0.0.0',
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e?.message || 'unknown' });
  }
}
