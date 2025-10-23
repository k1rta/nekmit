import { test, expect } from '@playwright/test';
import { dataTestIds } from './selectors';

test.describe('Landscape Layout - Non-blocking', () => {
  test.describe('Mobile Landscape Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport in landscape orientation
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');
    });

    test('should not render landscape banner', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);
    });

    test('should keep main content visible in landscape', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      await expect(main).toBeVisible();
    });

    test('should keep footer visible in landscape', async ({ page }) => {
      const footer = page.locator(dataTestIds.footer);
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Mobile Portrait Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport in portrait orientation
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('should not render landscape banner in portrait mode', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);
    });

    test('should show main content in portrait mode', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      await expect(main).toBeVisible();
    });

    test('should show footer in portrait mode', async ({ page }) => {
      const footer = page.locator(dataTestIds.footer);
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Tablet Landscape Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set tablet viewport in landscape orientation (should still show overlay)
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.goto('/');
    });

    test('should not render landscape banner on tablet in landscape mode', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);
    });

    test('should keep content visible on tablet landscape', async ({ page }) => {
      await expect(page.locator(dataTestIds.main)).toBeVisible();
      await expect(page.locator(dataTestIds.footer)).toBeVisible();
    });
  });

  test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
    });

    test('should not render landscape banner on desktop', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);
    });

    test('should show all content on desktop', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      const footer = page.locator(dataTestIds.footer);
      await expect(main).toBeVisible();
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Orientation Change', () => {
    test('should keep content visible when rotating device', async ({ page }) => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);

      // Rotate to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(100); // Small delay for CSS to apply
      await expect(page.locator(dataTestIds.main)).toBeVisible();
      await expect(page.locator(dataTestIds.footer)).toBeVisible();
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);

      // Rotate back to portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(100);
      await expect(page.locator(dataTestIds.landscapeBanner)).toHaveCount(0);
    });
  });
});
