import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../../shared/page-objects/HomePage';
import { TestHelpers } from '../../shared/utils/test-helpers';
import { VIEWPORTS } from '../../shared/utils/test-data';

test.describe('Homepage Layout Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await allure.epic('Homepage');
    await allure.feature('Layout');
  });

  test('should display all main layout elements on desktop', async ({ page }) => {
    await allure.story('Desktop Layout');
    await allure.severity('critical');
    
    await TestHelpers.setDesktopViewport(page);
    await homePage.goto();
    await homePage.waitForLoad();
    
    await homePage.verifyBasicLayout();
    await homePage.verifyNavigationIcons();
    
    // Verify main heading is prominent
    await expect(homePage.mainHeading).toHaveText(/Kirta-Linda Karits/);
    
    // Verify tagline is visible
    await expect(homePage.tagline).toBeVisible();
    
    // Verify value proposition
    await expect(homePage.valueProposition).toBeVisible();
    
    await TestHelpers.takeScreenshot(page, 'homepage-desktop-layout');
  });

  test('should display responsive layout on mobile portrait', async ({ page }) => {
    await allure.story('Mobile Portrait Layout');
    await allure.severity('critical');
    
    await TestHelpers.setMobileViewport(page);
    await homePage.goto();
    await homePage.waitForLoad();
    
    await homePage.verifyBasicLayout();
    
    // Verify navigation icons are arranged in grid on mobile
    const iconNavigation = homePage.iconNavigation;
    await expect(iconNavigation).toBeVisible();
    
    // Check that icons have proper touch target sizes
    const icons = await homePage.getNavigationIcons();
    for (const icon of icons) {
      const boundingBox = await icon.boundingBox();
      expect(boundingBox?.width).toBeGreaterThanOrEqual(44); // WCAG minimum
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    }
    
    await TestHelpers.takeScreenshot(page, 'homepage-mobile-portrait');
  });

  test('should display responsive layout on tablet', async ({ page }) => {
    await allure.story('Tablet Layout');
    await allure.severity('normal');
    
    await TestHelpers.setTabletViewport(page);
    await homePage.goto();
    await homePage.waitForLoad();
    
    await homePage.verifyBasicLayout();
    await homePage.verifyNavigationIcons();
    
    await TestHelpers.takeScreenshot(page, 'homepage-tablet-layout');
  });

  test('should handle landscape mode appropriately', async ({ page }) => {
    await allure.story('Landscape Mode');
    await allure.severity('normal');
    
    await page.setViewportSize(VIEWPORTS.MOBILE_LANDSCAPE);
    await homePage.goto();
    await homePage.waitForLoad();
    
    // On mobile landscape, banner should not be blocking
    await expect(homePage.landscapeBanner).not.toBeVisible();
    
    // Main content should still be visible
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.footer).toBeVisible();
    
    await TestHelpers.takeScreenshot(page, 'homepage-mobile-landscape');
  });

  test('should maintain layout integrity across different screen sizes', async ({ page }) => {
    await allure.story('Cross-Device Compatibility');
    await allure.severity('normal');
    
    const viewports = [
      VIEWPORTS.MOBILE_PORTRAIT,
      VIEWPORTS.TABLET_PORTRAIT,
      VIEWPORTS.DESKTOP_SMALL,
      VIEWPORTS.DESKTOP_LARGE
    ];

    for (const viewport of viewports) {
      await homePage.verifyResponsiveLayout(viewport);
      await page.waitForTimeout(500); // Allow for layout adjustments
    }
  });
});
