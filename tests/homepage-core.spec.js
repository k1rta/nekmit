import { test, expect } from '@playwright/test';
import { dataTestIds, links, text } from './selectors.js';

test.describe('homepage - core elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Kirta-Linda Karits/);
  });

  test('should display main heading with correct text', async ({ page }) => {
    await expect(page.locator(dataTestIds.mainHeading)).toBeVisible();
    await expect(page.locator(dataTestIds.mainHeading)).toHaveText(text.heading);
  });

  test('should display tagline with dots', async ({ page }) => {
    const tagline = page.locator(dataTestIds.tagline);
    await expect(tagline).toBeVisible();
    await expect(tagline).toHaveText(text.tagline);
  });

  test('should display footer with badges', async ({ page }) => {
    await expect(page.locator(dataTestIds.footer)).toBeVisible();

    // Check that badge bar is visible
    await expect(page.locator(dataTestIds.badgeBar)).toBeVisible();

    // Check that all badges are visible
    await expect(page.locator(dataTestIds.badgeDeployment)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeQuality)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeUx)).toBeVisible();
    await expect(page.locator(dataTestIds.badgePerformance)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeAccessibility)).toBeVisible();
  });
});
