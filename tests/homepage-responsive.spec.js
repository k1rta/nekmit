import { test, expect } from '@playwright/test';
import { dataTestIds, viewports } from './selectors.js';

test.describe('homepage - responsive design', () => {
  test('should display mobile tagline on small screens', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto('/');

    await expect(page.locator(dataTestIds.taglineMobile)).toBeVisible();
    await expect(page.locator(dataTestIds.taglineDesktop)).toBeHidden();
  });

  test('should display desktop tagline on large screens', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto('/');

    await expect(page.locator(dataTestIds.taglineDesktop)).toBeVisible();
    await expect(page.locator(dataTestIds.taglineMobile)).toBeHidden();
  });

  test('should display all icons on mobile', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto('/');

    await expect(page.locator(dataTestIds.iconResume)).toBeVisible();
    await expect(page.locator(dataTestIds.iconGithub)).toBeVisible();
    await expect(page.locator(dataTestIds.iconTestReports)).toBeVisible();
    await expect(page.locator(dataTestIds.iconHealth)).toBeVisible();
    await expect(page.locator(dataTestIds.iconEmail)).toBeVisible();
    await expect(page.locator(dataTestIds.iconCompany)).toBeVisible();
  });

  test('heading should be visible on tablet', async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await page.goto('/');

    await expect(page.locator(dataTestIds.mainHeading)).toBeVisible();
  });
});
