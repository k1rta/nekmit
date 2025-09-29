import { test, expect } from '@playwright/test';

// Layout checks at key breakpoints

test.describe('layout breakpoints', () => {
  test('mobile portrait ~375x667 (3x2 icons)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // 6 icons present
    await expect(page.getByTestId('icon-list').locator('li')).toHaveCount(6);
  });

  test('tiny landscape ~667x375 (iPhone SE-like)', async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');
    // 6 icons present; we don't assert exact grid count, just existence
    await expect(page.getByTestId('icon-list').locator('li')).toHaveCount(6);
  });

  test('desktop 1280x800', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.getByTestId('header')).toBeVisible();
  });
});
