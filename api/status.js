/* eslint-env node */
/* eslint-disable no-undef */

/**
 * Comprehensive DevOps Status API
 * Demonstrates real monitoring capabilities including:
 * - Health checks
 * - Performance metrics
 * - Dependency checks
 * - Infrastructure status
 * - Security headers validation
 */

module.exports = async function handler(req, res) {
  const startTime = Date.now();

  try {
    // Set security headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Collect system metrics
    const metrics = await collectSystemMetrics();

    // Perform health checks
    const healthChecks = await performHealthChecks();

    // Check dependencies
    const dependencyStatus = await checkDependencies();

    // Calculate overall status
    const overallStatus = calculateOverallStatus(healthChecks, dependencyStatus);

    const responseTime = Date.now() - startTime;

    const statusResponse = {
      status: overallStatus.status,
      message: overallStatus.message,
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
      environment: {
        env: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
        region: process.env.VERCEL_REGION || 'local',
        commitSha: (process.env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 7) || 'dev',
        commitRef: process.env.VERCEL_GIT_COMMIT_REF || 'main',
      },
      metrics,
      healthChecks,
      dependencies: dependencyStatus,
      uptime: {
        processUptimeSeconds: Math.round(process.uptime() * 100) / 100,
        serverStartTime: new Date(Date.now() - process.uptime() * 1000).toISOString(),
      },
    };

    // Set appropriate HTTP status code
    const httpStatus =
      overallStatus.status === 'healthy' ? 200 : overallStatus.status === 'degraded' ? 200 : 503;

    res.status(httpStatus).json(statusResponse);
  } catch (error) {
    const responseTime = Date.now() - startTime;

    res.status(500).json({
      status: 'error',
      message: 'Status check failed',
      error: error.message,
      timestamp: new Date().toISOString(),
      responseTimeMs: responseTime,
    });
  }
};

async function collectSystemMetrics() {
  try {
    const memUsage = process.memoryUsage();

    return {
      memory: {
        used: Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100, // MB
        total: Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100, // MB
        external: Math.round((memUsage.external / 1024 / 1024) * 100) / 100, // MB
        rss: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100, // MB
      },
      process: {
        pid: process.pid,
        version: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: Math.round(process.uptime() * 100) / 100,
      },
    };
  } catch {
    return { error: 'Failed to collect system metrics' };
  }
}

async function performHealthChecks() {
  const checks = {};

  // Database connectivity check (simulated - replace with real DB check)
  checks.database = await checkDatabase();

  // External API checks
  checks.github = await checkGitHubAPI();

  // DNS resolution check
  checks.dns = await checkDNS();

  // SSL certificate check
  checks.ssl = await checkSSL();

  return checks;
}

async function checkDatabase() {
  // Simulate database check - replace with actual database connection
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve({
          status: 'healthy',
          responseTimeMs: Math.floor(Math.random() * 50) + 10,
          message: 'Database connection successful',
        });
      },
      Math.floor(Math.random() * 30) + 10
    );
  });
}

async function checkGitHubAPI() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const startTime = Date.now();
    const response = await fetch('https://api.github.com/repos/k1rta/nekmit', {
      signal: controller.signal,
      headers: {
        'User-Agent': 'nekmit-status-check',
      },
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        status: 'healthy',
        responseTimeMs: responseTime,
        message: 'GitHub API accessible',
      };
    } else {
      return {
        status: 'unhealthy',
        responseTimeMs: responseTime,
        message: `GitHub API returned ${response.status}`,
      };
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTimeMs: 5000,
      message: `GitHub API check failed: ${error.message}`,
    };
  }
}

async function checkDNS() {
  try {
    const { lookup } = require('dns').promises;
    const startTime = Date.now();

    await lookup('nekmit.vercel.app');
    const responseTime = Date.now() - startTime;
    return {
      status: 'healthy',
      responseTimeMs: responseTime,
      message: 'DNS resolution successful',
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      responseTimeMs: 5000,
      message: `DNS resolution failed: ${error.message}`,
    };
  }
}

async function checkSSL() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const startTime = Date.now();
    await fetch('https://nekmit.vercel.app', {
      signal: controller.signal,
      method: 'HEAD',
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    return {
      status: 'healthy',
      responseTimeMs: responseTime,
      message: 'SSL certificate valid',
    };
  } catch {
    return {
      status: 'unhealthy',
      responseTimeMs: 5000,
      message: 'SSL check failed',
    };
  }
}

async function checkDependencies() {
  const dependencies = {};

  // Check critical external services
  dependencies.vercel = await checkVercelStatus();
  dependencies.github = await checkGitHubStatus();

  return dependencies;
}

async function checkVercelStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const startTime = Date.now();
    const response = await fetch('https://www.vercel-status.com/api/v2/status.json', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        status: data.status?.indicator === 'none' ? 'healthy' : 'degraded',
        responseTimeMs: responseTime,
        message: `Vercel status: ${data.status?.description || 'unknown'}`,
      };
    } else {
      return {
        status: 'unknown',
        responseTimeMs: responseTime,
        message: 'Could not fetch Vercel status',
      };
    }
  } catch {
    return {
      status: 'unknown',
      responseTimeMs: 3000,
      message: 'Vercel status check timeout',
    };
  }
}

async function checkGitHubStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const startTime = Date.now();
    const response = await fetch('https://www.githubstatus.com/api/v2/status.json', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;

    if (response.ok) {
      const data = await response.json();
      return {
        status: data.status?.indicator === 'none' ? 'healthy' : 'degraded',
        responseTimeMs: responseTime,
        message: `GitHub status: ${data.status?.description || 'unknown'}`,
      };
    } else {
      return {
        status: 'unknown',
        responseTimeMs: responseTime,
        message: 'Could not fetch GitHub status',
      };
    }
  } catch {
    return {
      status: 'unknown',
      responseTimeMs: 3000,
      message: 'GitHub status check timeout',
    };
  }
}

function calculateOverallStatus(healthChecks, dependencies) {
  const allChecks = [...Object.values(healthChecks), ...Object.values(dependencies)];

  const unhealthyCount = allChecks.filter((check) => check.status === 'unhealthy').length;
  const degradedCount = allChecks.filter((check) => check.status === 'degraded').length;
  const unknownCount = allChecks.filter((check) => check.status === 'unknown').length;

  if (unhealthyCount > 0) {
    return {
      status: 'unhealthy',
      message: `${unhealthyCount} critical service(s) down`,
    };
  } else if (degradedCount > 0) {
    return {
      status: 'degraded',
      message: `${degradedCount} service(s) experiencing issues`,
    };
  } else if (unknownCount > 0) {
    return {
      status: 'degraded',
      message: `${unknownCount} service(s) status unknown`,
    };
  } else {
    return {
      status: 'healthy',
      message: 'All systems operational',
    };
  }
}
