import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for smoke tests only
 * Used for quick validation on every push
 */
export default defineConfig({
  testDir: './tests/smoke',
  timeout: 15 * 1000, // Shorter timeout for smoke tests
  expect: { timeout: 3000 },
  fullyParallel: true,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report-smoke',
      },
    ],
    ['list'],
    ['json', { outputFile: 'playwright-report-smoke/results.json' }],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run preview -- --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: !process.env.CI,
        timeout: 60 * 1000,
      },
  projects: [
    {
      name: 'Smoke - Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
