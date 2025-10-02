import { test, expect } from '@playwright/test';
import { s } from '../selectors';

/**
 * End-to-End Tests - Responsive Design
 *
 * Tests layout and functionality across different screen sizes.
 * Run on PR creation to ensure responsive design works.
 */

test.describe('E2E Tests - Responsive Design', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`Layout works correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Core elements should be visible at all sizes
      await expect(page.locator(s.header)).toBeVisible();
      await expect(page.locator(s.title)).toBeVisible();
      await expect(page.locator(s.tagline1)).toBeVisible();
      await expect(page.locator(s.icons)).toHaveCount(6);
      await expect(page.locator(s.footer)).toBeVisible();

      // Test navigation still works
      const statusIcon = page.locator(s.iconHealth);
      await expect(statusIcon).toBeVisible();
      await statusIcon.click();

      await expect(page).toHaveTitle('Status');
      await expect(page.locator(s.statusCard)).toBeVisible();

      // Back button should work
      const backButton = page.locator(s.backButton);
      await expect(backButton).toBeVisible();
    });
  });

  test('Status page is responsive across viewports', async ({ page }) => {
    for (const { name, width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto('/status');

      // Status page elements should be visible
      await expect(page.locator(s.statusCard)).toBeVisible();
      await expect(page.locator(s.backButton)).toBeVisible();

      // Skip link should work
      const skipLink = page.locator(s.skipLink);
      await expect(skipLink).toBeVisible();
    }
  });
});
