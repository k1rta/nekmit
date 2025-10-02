import { test, expect } from '@playwright/test';
import { s } from '../selectors';

/**
 * Smoke Tests - Core Functionality
 *
 * These are the most critical tests that verify basic functionality.
 * Run on every push to ensure the site doesn't break.
 */

test.describe('Smoke Tests - Core Functionality', () => {
  test('Homepage loads and displays essential elements', async ({ page }) => {
    await page.goto('/');

    // Verify page loads
    await expect(page).toHaveTitle(/Kirta/i);

    // Verify core elements are present
    await expect(page.locator(s.header)).toBeVisible();
    await expect(page.locator(s.title)).toHaveText(/Kirta/i);
    await expect(page.locator(s.tagline1)).toBeVisible();
    await expect(page.locator(s.footer)).toBeVisible();
  });

  test('Navigation icons are present and accessible', async ({ page }) => {
    await page.goto('/');

    // Verify all 6 icons are present
    await expect(page.locator(s.icons)).toHaveCount(6);

    // Verify key navigation works
    const statusIcon = page.locator(s.iconHealth);
    await expect(statusIcon).toBeVisible();
    await expect(statusIcon).toHaveAttribute('href', '/status');
  });

  test('Status page loads successfully', async ({ page }) => {
    await page.goto('/status');

    // Verify page loads
    await expect(page).toHaveTitle('Status');

    // Verify status card is present
    await expect(page.locator(s.statusCard)).toBeVisible();

    // Verify back button works
    const backButton = page.locator(s.backButton);
    await expect(backButton).toBeVisible();
    await expect(backButton).toHaveAttribute('href', '/');
  });

  test('Skip link accessibility feature works', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator(s.skipLink);
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    const main = page.getByTestId('main');
    await expect(main).toBeVisible();
  });
});
