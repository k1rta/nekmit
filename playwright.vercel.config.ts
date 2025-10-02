import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for testing against Vercel preview deployments
 * Used when PLAYWRIGHT_BASE_URL is set to a Vercel preview URL
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45 * 1000, // Longer timeout for remote testing
  expect: { timeout: 8000 },
  fullyParallel: true,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'playwright-report-vercel',
      },
    ],
    ['list'],
    ['json', { outputFile: 'playwright-report-vercel/results.json' }],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL, // Must be set to Vercel URL
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  // No webServer since we're testing against live Vercel deployment
  projects: [
    {
      name: 'Vercel - Chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.spec\.ts/, // Run all tests including API integration
    },
    {
      name: 'Vercel - Mobile',
      use: { ...devices['Pixel 5'] },
      testMatch: /.*\/smoke\/.*\.spec\.ts/, // Only smoke tests on mobile for Vercel
    },
  ],
});
