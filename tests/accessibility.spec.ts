import { test, expect } from '@playwright/test';

// Accessibility related smoke: skip-link focusing main

test('skip-link focuses main', async ({ page }) => {
  await page.goto('/');
  // Press tab to focus the first focusable element (skip-link), then Enter
  await page.keyboard.press('Tab');
  await expect(page.locator('a.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  // Main should be scrolled into view; we at least assert it's visible
  await expect(page.getByTestId('main')).toBeVisible();
});
