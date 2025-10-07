import { test, expect } from '@playwright/test';
import { s } from './selectors';

// Status page tests - can be run in a separate branch
test.describe('Status Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to status page before each test
    await page.goto('/status');
  });

  test('should load status page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Status');
  });

  test('should display status card with indicator', async ({ page }) => {
    // Check main status card exists
    const statusCard = page.locator(s.statusCard);
    await expect(statusCard).toBeVisible();

    // Check status indicator exists
    const statusIndicator = page.locator(s.statusIndicator);
    await expect(statusIndicator).toBeVisible();

    // Check HTTP status text
    const httpStatus = page.locator(s.httpStatus);
    await expect(httpStatus).toBeVisible();
    await expect(httpStatus).toHaveText('200 OK');
  });

  test('should have working back button', async ({ page }) => {
    // Find back button
    const backButton = page.locator(s.backButton);
    await expect(backButton).toBeVisible();

    // Check it has proper attributes
    await expect(backButton).toHaveAttribute('href', '/');
    await expect(backButton).toHaveAttribute('title', 'Back to homepage');
    await expect(backButton).toHaveAttribute('aria-label', 'Back to homepage');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload(); // Reload with new viewport

    // Status card should still be visible
    const statusCard = page.locator(s.statusCard);
    await expect(statusCard).toBeVisible();

    // Back button should be accessible
    const backButton = page.locator(s.backButton);
    await expect(backButton).toBeVisible();
  });

  test('should have accessibility features', async ({ page }) => {
    // Check skip link
    const skipLink = page.locator(s.skipLink);
    await expect(skipLink).toBeVisible();

    // Check main content
    const main = page.locator(s.main);
    await expect(main).toBeVisible();
  });
});
