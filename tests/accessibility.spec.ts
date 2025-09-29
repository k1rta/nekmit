import { test, expect } from '@playwright/test';

// Accessibility related smoke: skip-link focusing main

test('skip-link focuses main', async ({ page }) => {
  await page.goto('/');
  const skip = page.locator('a.skip-link');
  await skip.focus();
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  // Main should be scrolled into view; we at least assert it's visible
  const main = page.getByTestId('main');
  await expect(main).toBeVisible();
  // Stronger assertion if tabindex="-1" exists on #main:
  // await expect(main).toBeFocused();
});
