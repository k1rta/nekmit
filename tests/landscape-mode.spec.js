import { test, expect } from '@playwright/test';
import { dataTestIds, text } from './selectors.js';

test.describe('Landscape Mode Restriction', () => {
  test.describe('Mobile Landscape Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport in landscape orientation
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');
    });

    test('should display landscape overlay on mobile in landscape mode', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).toBeVisible();
    });

    test('should show rotate device message', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).toContainText(text.landscapeWarning.heading);
      await expect(overlay).toContainText(text.landscapeWarning.message);
    });

    test('should display mobile phone icon', async ({ page }) => {
      const icon = page.locator(`${dataTestIds.landscapeOverlay} i.fa-mobile-screen-button`);
      await expect(icon).toBeVisible();
    });

    test('should hide main content when overlay is shown', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).not.toBeVisible();
    });

    test('should hide footer when overlay is shown', async ({ page }) => {
      const footer = page.locator(dataTestIds.footer);
      await expect(footer).not.toBeVisible();
    });

    test('should have proper z-index to cover content', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      const zIndex = await overlay.evaluate(el => window.getComputedStyle(el).zIndex);
      expect(parseInt(zIndex)).toBeGreaterThanOrEqual(50);
    });
  });

  test.describe('Mobile Portrait Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport in portrait orientation
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('should not display landscape overlay in portrait mode', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).not.toBeVisible();
    });

    test('should show main content in portrait mode', async ({ page }) => {
      const main = page.locator('main');
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

    test('should display landscape overlay on tablet in landscape mode', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).toBeVisible();
    });
  });

  test.describe('Desktop Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
    });

    test('should not display landscape overlay on desktop', async ({ page }) => {
      const overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).not.toBeVisible();
    });

    test('should show all content on desktop', async ({ page }) => {
      const main = page.locator('main');
      const footer = page.locator(dataTestIds.footer);
      await expect(main).toBeVisible();
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Orientation Change', () => {
    test('should toggle overlay when rotating device', async ({ page }) => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      let overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).not.toBeVisible();

      // Rotate to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(100); // Small delay for CSS to apply

      overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).toBeVisible();

      // Rotate back to portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(100);

      overlay = page.locator(dataTestIds.landscapeOverlay);
      await expect(overlay).not.toBeVisible();
    });
  });
});
