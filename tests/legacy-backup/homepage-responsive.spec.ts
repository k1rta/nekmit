import { test, expect } from '@playwright/test';
import { dataTestIds, viewports } from './selectors';

test.describe('homepage - responsive design', () => {
  test('should display tagline on small screens', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto('/');

    const tagline = page.locator(dataTestIds.tagline);
    await expect(tagline).toBeVisible();

    // Should have smaller font size on mobile
    const fontSize = await tagline.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeLessThanOrEqual(16);
  });

  test('should display tagline on large screens', async ({ page }) => {
    await page.setViewportSize(viewports.desktop);
    await page.goto('/');

    const tagline = page.locator(dataTestIds.tagline);
    await expect(tagline).toBeVisible();

    // Should have larger font size on desktop
    const fontSize = await tagline.evaluate(el => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);
  });

  test('should display all icons on mobile', async ({ page }) => {
    await page.setViewportSize(viewports.mobile);
    await page.goto('/');

    await expect(page.locator(dataTestIds.iconResume)).toBeVisible();
    await expect(page.locator(dataTestIds.iconProjects)).toBeVisible();
    await expect(page.locator(dataTestIds.iconQuality)).toBeVisible();
    await expect(page.locator(dataTestIds.iconUptime)).toBeVisible();
    await expect(page.locator(dataTestIds.iconBusiness)).toBeVisible();
    await expect(page.locator(dataTestIds.iconContact)).toBeVisible();
  });

  test('heading should be visible on tablet', async ({ page }) => {
    await page.setViewportSize(viewports.tablet);
    await page.goto('/');

    await expect(page.locator(dataTestIds.mainHeading)).toBeVisible();
  });
});
