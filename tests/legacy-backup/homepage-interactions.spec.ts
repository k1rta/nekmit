import { test, expect } from '@playwright/test';
import { dataTestIds } from './selectors';

test.describe('homepage - interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('icons should have pulse animation', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveClass(/icon-pulse/);
  });

  test('hovering over an icon should pause all animations', async ({ page }) => {
    const resumeIcon = page.locator(dataTestIds.iconResume);
    await resumeIcon.hover();
    await expect(page.locator(dataTestIds.iconNavigation)).toBeVisible();
  });

  test('badges should be visible in footer', async ({ page }) => {
    await expect(page.locator(dataTestIds.badgeBar)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeDeployment)).toBeVisible();
  });
});
