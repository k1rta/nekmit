import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - Accessibility
 *
 * Critical accessibility features that must work for basic usability.
 * Run on every push to ensure accessibility isn't broken.
 */

test.describe('Smoke Tests - Accessibility', () => {
  test('Skip link navigation works correctly', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');

    // Main content should be visible after skip link activation
    const main = page.getByTestId('main');
    await expect(main).toBeVisible();
  });
});
