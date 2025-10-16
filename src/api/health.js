import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Health check endpoint
app.get('/api/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
    tests: {
      lastRun: getLastTestRun(),
      status: 'passing',
    },
  };

  res.json(health);
});

// Get last test run info
function getLastTestRun() {
  try {
    const reportPath = join(__dirname, '../../public/test-reports/results.json');
    if (fs.existsSync(reportPath)) {
      const data = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      return {
        date: new Date(data.stats?.startTime || Date.now()).toISOString(),
        passed: data.stats?.expected || 0,
        failed: data.stats?.unexpected || 0,
      };
    }
  } catch (error) {
    console.error('Error reading test results:', error);
  }
  return { date: 'Never', passed: 0, failed: 0 };
}

app.listen(PORT, () => {
  console.log(`Health API running on http://localhost:${PORT}`);
});
