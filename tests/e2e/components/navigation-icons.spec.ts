import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../../shared/page-objects/HomePage';
import { TestHelpers } from '../../shared/utils/test-helpers';
import { EXPECTED_NAVIGATION_ICONS } from '../../shared/utils/test-data';

test.describe('Navigation Icons Component Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await TestHelpers.setDesktopViewport(page);
    await homePage.goto();
    await homePage.waitForLoad();
    
    await allure.epic('Components');
    await allure.feature('Navigation Icons');
  });

  test('should display all navigation icons with correct attributes', async ({ page }) => {
    await allure.story('Icon Visibility and Attributes');
    await allure.severity('critical');
    
    for (const iconData of EXPECTED_NAVIGATION_ICONS) {
      const icon = page.getByTestId(iconData.testId);
      
      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-label', iconData.label);
      await expect(icon).toHaveAttribute('href', iconData.href);
      
      if (iconData.href.startsWith('http')) {
        await expect(icon).toHaveAttribute('target', '_blank');
        await expect(icon).toHaveAttribute('rel', 'noopener');
      }
    }
  });

  test('should show tooltips on hover', async ({ page }) => {
    await allure.story('Tooltip Interactions');
    await allure.severity('normal');
    
    for (const iconData of EXPECTED_NAVIGATION_ICONS) {
      await TestHelpers.verifyTooltip(
        page, 
        `[data-testid="${iconData.testId}"]`, 
        iconData.tooltip
      );
    }
  });

  test('should have proper hover effects', async ({ page }) => {
    await allure.story('Hover Effects');
    await allure.severity('normal');
    
    const resumeIcon = homePage.resumeIcon;
    
    // Get initial styles
    const initialTransform = await resumeIcon.evaluate(el => {
      // eslint-disable-next-line no-undef
      return getComputedStyle(el).transform;
    });
    
    // Hover and check for transform changes
    await resumeIcon.hover();
    await page.waitForTimeout(300); // Wait for transition
    
    const hoveredTransform = await resumeIcon.evaluate(el => {
      // eslint-disable-next-line no-undef
      return getComputedStyle(el).transform;
    });
    
    expect(hoveredTransform).not.toBe(initialTransform);
    
    // Move away and verify return to normal
    await page.hover('body');
    await page.waitForTimeout(300);
    
    const finalTransform = await resumeIcon.evaluate(el => {
      // eslint-disable-next-line no-undef
      return getComputedStyle(el).transform;
    });
    
    expect(finalTransform).toBe(initialTransform);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await allure.story('Keyboard Accessibility');
    await allure.severity('critical');
    
    // Tab through all navigation icons
    await page.keyboard.press('Tab');
    
    for (const iconData of EXPECTED_NAVIGATION_ICONS) {
      const icon = page.getByTestId(iconData.testId);
      await expect(icon).toBeFocused();
      await page.keyboard.press('Tab');
    }
  });

  test('should maintain proper spacing and alignment', async () => {
    await allure.story('Layout and Spacing');
    await allure.severity('normal');
    
    const icons = await homePage.getNavigationIcons();
    const iconPositions = [];
    
    for (const icon of icons) {
      const boundingBox = await icon.boundingBox();
      iconPositions.push(boundingBox);
    }
    
    // Verify icons are properly spaced (not overlapping)
    for (let i = 0; i < iconPositions.length - 1; i++) {
      const current = iconPositions[i];
      const next = iconPositions[i + 1];
      
      if (current && next) {
        const horizontalGap = Math.abs(next.x - (current.x + current.width));
        const verticalGap = Math.abs(next.y - (current.y + current.height));
        
        // At least one dimension should have proper spacing
        expect(horizontalGap > 10 || verticalGap > 10).toBeTruthy();
      }
    }
  });

  test('should work correctly on mobile devices', async ({ page }) => {
    await allure.story('Mobile Responsiveness');
    await allure.severity('critical');
    
    await TestHelpers.setMobileViewport(page);
    await page.reload();
    await homePage.waitForLoad();
    
    // Verify all icons are still visible and accessible on mobile
    for (const iconData of EXPECTED_NAVIGATION_ICONS) {
      const icon = page.getByTestId(iconData.testId);
      await expect(icon).toBeVisible();
      
      // Verify touch target size
      const boundingBox = await icon.boundingBox();
      expect(boundingBox?.width).toBeGreaterThanOrEqual(44);
      expect(boundingBox?.height).toBeGreaterThanOrEqual(44);
    }
    
    await TestHelpers.takeScreenshot(page, 'navigation-icons-mobile');
  });
});
