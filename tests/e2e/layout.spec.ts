import { test, expect } from '@playwright/test';
import { s } from '../selectors';

/**
 * End-to-End Tests - Layout Breakpoints
 *
 * Comprehensive layout testing across different screen sizes.
 * Run on PR creation to ensure responsive design works properly.
 */

test.describe('E2E Tests - Layout Breakpoints', () => {
  test('Mobile portrait layout (375x667) displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // All core elements should be present and visible
    await expect(page.locator(s.header)).toBeVisible();
    await expect(page.locator(s.title)).toBeVisible();
    await expect(page.locator(s.icons)).toHaveCount(6);
    await expect(page.locator(s.footer)).toBeVisible();
  });

  test('Mobile landscape layout (667x375) displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    // Icons should still be accessible in landscape mode
    await expect(page.locator(s.icons)).toHaveCount(6);
    await expect(page.locator(s.header)).toBeVisible();
  });

  test('Desktop layout (1280x800) displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    // Full desktop layout should be visible
    await expect(page.locator(s.header)).toBeVisible();
    await expect(page.locator(s.title)).toBeVisible();
    await expect(page.locator(s.tagline1)).toBeVisible();
    await expect(page.locator(s.tagline2)).toBeVisible();
    await expect(page.locator(s.tagline3)).toBeVisible();
    await expect(page.locator(s.icons)).toHaveCount(6);
  });
});
