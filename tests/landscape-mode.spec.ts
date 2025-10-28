import { test, expect } from '@playwright/test';
import { dataTestIds } from './selectors';

test.describe('Landscape Mode with Warning Banner', () => {
  test.describe('Mobile Landscape Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Clear session storage to ensure banner shows
      await page.addInitScript(() => {
        window.sessionStorage.clear();
      });
      // Set mobile viewport in landscape orientation
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');
      // Wait for JavaScript to initialize and CSS to apply
      await page.waitForTimeout(200);
      // Verify the landscape banner is visible before proceeding
      await expect(page.locator(dataTestIds.landscapeBanner)).toBeVisible();
    });

    test('should show landscape overlay on mobile in landscape', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).toBeVisible();
      await expect(page.locator(dataTestIds.landscapeBanner)).toContainText(
        'For the best experience, please use portrait mode'
      );
      await expect(page.locator(dataTestIds.landscapeBanner)).toContainText(
        'Please Rotate Your Device'
      );
    });

    test('should add landscape-mode-active class to body', async ({ page }) => {
      const bodyClass = await page.evaluate(() => document.body.className);
      expect(bodyClass).toContain('landscape-mode-active');
    });

    test('should hide main content when landscape overlay is shown', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      await expect(main).not.toBeVisible();
    });

    test('should hide footer when landscape overlay is shown', async ({ page }) => {
      const footer = page.locator(dataTestIds.footer);
      await expect(footer).not.toBeVisible();
    });

    test('should show landscape overlay with proper styling and centering', async ({ page }) => {
      const banner = page.locator(dataTestIds.landscapeBanner);

      // Wait for landscape mode to be active
      await page.waitForFunction(() => document.body.classList.contains('landscape-mode-active'));
      await expect(banner).toBeVisible();

      // Check that the banner contains the expected text
      await expect(banner).toContainText('Please Rotate Your Device');
      await expect(banner).toContainText('For the best experience, please use portrait mode');

      // Verify proper centering by checking CSS classes and positioning
      const contentContainer = banner.locator('div').first();
      await expect(contentContainer).toHaveClass(/absolute/);
      await expect(contentContainer).toHaveClass(/inset-0/);
      await expect(contentContainer).toHaveClass(/flex/);
      await expect(contentContainer).toHaveClass(/items-center/);
      await expect(contentContainer).toHaveClass(/justify-center/);

      // Check inner content container has proper centering classes
      const innerContainer = contentContainer.locator('div').first();
      await expect(innerContainer).toHaveClass(/text-center/);
      await expect(innerContainer).toHaveClass(/mx-auto/);

      // Verify there's no dismiss button
      const dismissButton = page.locator(dataTestIds.landscapeDismiss);
      await expect(dismissButton).not.toBeVisible();

      // Test visual centering by checking element position
      const bannerBox = await banner.boundingBox();
      const viewportSize = page.viewportSize();

      if (bannerBox && viewportSize) {
        // Banner should cover the full viewport
        expect(bannerBox.x).toBe(0);
        expect(bannerBox.y).toBe(0);
        expect(bannerBox.width).toBe(viewportSize.width);
        expect(bannerBox.height).toBe(viewportSize.height);
      }
    });

    test('should center content perfectly in landscape overlay', async ({ page }) => {
      const banner = page.locator(dataTestIds.landscapeBanner);

      // Wait for landscape mode to be active
      await page.waitForFunction(() => document.body.classList.contains('landscape-mode-active'));
      await expect(banner).toBeVisible();

      // Get the main content container (the div with text-center class)
      const contentDiv = banner.locator('div.text-center').first();
      const contentBox = await contentDiv.boundingBox();
      const viewportSize = page.viewportSize();

      if (contentBox && viewportSize) {
        // Calculate center positions
        const contentCenterX = contentBox.x + contentBox.width / 2;
        const contentCenterY = contentBox.y + contentBox.height / 2;
        const viewportCenterX = viewportSize.width / 2;
        const viewportCenterY = viewportSize.height / 2;

        // Allow small tolerance for centering (within 10px)
        const tolerance = 10;

        // Verify horizontal centering
        expect(Math.abs(contentCenterX - viewportCenterX)).toBeLessThan(tolerance);

        // Verify vertical centering
        expect(Math.abs(contentCenterY - viewportCenterY)).toBeLessThan(tolerance);
      }
    });

    test('should not display navigation when landscape overlay is shown', async ({ page }) => {
      // Navigation is part of main content, so it should be hidden
      const nav = page.locator(dataTestIds.iconNavigation);
      await expect(nav).not.toBeVisible();
    });
  });

  test.describe('Mobile Portrait Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport in portrait orientation
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('should not show landscape banner in portrait mode', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).not.toBeVisible();
    });

    test('should show main content in portrait mode', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      await expect(main).toBeVisible();
    });

    test('should show footer in portrait mode', async ({ page }) => {
      const footer = page.locator(dataTestIds.footer);
      await expect(footer).toBeVisible();
    });

    test('should display icons in grid on mobile portrait', async ({ page }) => {
      const nav = page.locator(dataTestIds.iconNavigation);
      await expect(nav).toHaveCSS('display', 'grid');
      // The grid-template-columns will show actual pixel values, not the repeat() function
      // Just verify it's a grid with 3 columns by checking the computed style
      const gridColumns = await nav.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
      // Should have 3 column values (e.g., "82px 82px 82px")
      expect(gridColumns.split(' ').length).toBe(3);
    });
  });

  test.describe('Tablet Landscape Mode', () => {
    test.beforeEach(async ({ page }) => {
      // Set tablet viewport in landscape orientation
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.goto('/');
    });

    test('should not show landscape banner on tablet', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).not.toBeVisible();
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

    test('should not show landscape banner on desktop', async ({ page }) => {
      await expect(page.locator(dataTestIds.landscapeBanner)).not.toBeVisible();
    });

    test('should show all content on desktop', async ({ page }) => {
      const main = page.locator(dataTestIds.main);
      const footer = page.locator(dataTestIds.footer);
      await expect(main).toBeVisible();
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Orientation Change', () => {
    test('should show/hide overlay when rotating device', async ({ page }) => {
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator(dataTestIds.landscapeBanner)).not.toBeVisible();

      // Rotate to landscape - overlay should appear and hide content
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(150); // Wait for orientation change and JS to apply
      await page.waitForFunction(() => document.body.classList.contains('landscape-mode-active'));
      await expect(page.locator(dataTestIds.landscapeBanner)).toBeVisible();
      await expect(page.locator(dataTestIds.main)).not.toBeVisible();
      await expect(page.locator(dataTestIds.footer)).not.toBeVisible();

      // Rotate back to portrait - overlay should hide and content should show
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(150); // Wait for orientation change and JS to apply
      await page.waitForFunction(() => !document.body.classList.contains('landscape-mode-active'));
      await expect(page.locator(dataTestIds.landscapeBanner)).not.toBeVisible();
      await expect(page.locator(dataTestIds.main)).toBeVisible();
      await expect(page.locator(dataTestIds.footer)).toBeVisible();
    });
  });
});
