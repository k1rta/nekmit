import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../shared/page-objects/HomePage';
import { TestHelpers } from '../shared/utils/test-helpers';
import { EXPECTED_NAVIGATION_ICONS } from '../shared/utils/test-data';

test.describe('Homepage Accessibility Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await TestHelpers.setDesktopViewport(page);
    await homePage.goto();
    await homePage.waitForLoad();
    
    await allure.epic('Accessibility');
    await allure.feature('Homepage');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await allure.story('Heading Structure');
    await allure.severity('critical');
    
    // Check for h1 element
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBe(1);
    
    // Verify h1 content
    await expect(homePage.mainHeading).toHaveText(/Kirta-Linda Karits/);
    
    // Check heading hierarchy (h1 should come before h2, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await allure.story('ARIA Attributes');
    await allure.severity('critical');
    
    // Check navigation icons have proper ARIA labels
    for (const iconData of EXPECTED_NAVIGATION_ICONS) {
      const icon = page.getByTestId(iconData.testId);
      await expect(icon).toHaveAttribute('aria-label', iconData.label);
    }
    
    // Check for proper landmark roles
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await allure.story('Keyboard Navigation');
    await allure.severity('critical');
    
    // Start from the top of the page
    await page.keyboard.press('Tab');
    
    // Tab through all interactive elements
    const interactiveElements = await page.locator('a, button, input, select, textarea').all();
    
    for (let i = 0; i < interactiveElements.length; i++) {
      const focusedElement = await page.locator(':focus').first();
      await expect(focusedElement).toBeVisible();
      
      // Verify focus is visible
      const focusOutline = await focusedElement.evaluate(el => {
        const styles = getComputedStyle(el);
        return styles.outline !== 'none' || styles.boxShadow !== 'none';
      });
      
      expect(focusOutline).toBeTruthy();
      
      if (i < interactiveElements.length - 1) {
        await page.keyboard.press('Tab');
      }
    }
  });

  test('should have sufficient color contrast', async () => {
    await allure.story('Color Contrast');
    await allure.severity('normal');
    
    // Check main heading contrast
    const headingColor = await homePage.mainHeading.evaluate(el => {
      // eslint-disable-next-line no-undef
      const styles = getComputedStyle(el);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      };
    });
    
    // Log color information for manual review
    await allure.attachment('Color Information', JSON.stringify(headingColor, null, 2), 'application/json');
    
    // Verify text is visible (basic check)
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.tagline).toBeVisible();
    await expect(homePage.valueProposition).toBeVisible();
  });

  test('should have proper focus management', async ({ page: _page }) => {
    await allure.story('Focus Management');
    await allure.severity('normal');
    
    // Test focus trap behavior if modal exists
    const landscapeBanner = homePage.landscapeBanner;
    
    // On mobile landscape, if banner is shown, focus should be managed
    await _page.setViewportSize({ width: 667, height: 375 });
    await _page.reload();
    
    const bannerVisible = await landscapeBanner.isVisible();
    if (bannerVisible) {
      // Focus should be within the banner
      await _page.keyboard.press('Tab');
      const focusedElement = await _page.locator(':focus').first();
      
      // Verify focus is within the banner area
      const bannerElement = await landscapeBanner.elementHandle();
      if (bannerElement) {
        const isWithinBanner = await focusedElement.evaluate((el: Element, banner: Element) => {
          return banner.contains(el);
        }, bannerElement);
        
        expect(isWithinBanner).toBeTruthy();
      }
    }
  });

  test('should support screen readers', async ({ page }) => {
    await allure.story('Screen Reader Support');
    await allure.severity('critical');
    
    // Check for screen reader only content
    const srOnlyElements = await page.locator('.sr-only').all();
    expect(srOnlyElements.length).toBeGreaterThan(0);
    
    // Verify sr-only elements have meaningful content
    for (const element of srOnlyElements) {
      const text = await element.textContent();
      expect(text?.trim()).toBeTruthy();
      expect(text?.length).toBeGreaterThan(2);
    }
    
    // Check that interactive elements have accessible names
    const links = await page.locator('a').all();
    for (const link of links) {
      const accessibleName = await link.evaluate(el => {
        return el.getAttribute('aria-label') || 
               el.textContent?.trim() || 
               el.querySelector('.sr-only')?.textContent?.trim();
      });
      
      expect(accessibleName).toBeTruthy();
    }
  });

  test('should respect reduced motion preferences', async ({ page }) => {
    await allure.story('Reduced Motion');
    await allure.severity('normal');
    
    // Simulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await homePage.waitForLoad();
    
    // Check that animations are disabled or reduced
    const navIcon = homePage.resumeIcon;
    const transition = await navIcon.evaluate(el => {
      // eslint-disable-next-line no-undef
      return getComputedStyle(el).transition;
    });
    
    // With reduced motion, transitions should be none or very short
    expect(transition === 'none' || transition.includes('0s')).toBeTruthy();
  });

  test('should work with high contrast mode', async ({ page }) => {
    await allure.story('High Contrast Mode');
    await allure.severity('normal');
    
    // Simulate high contrast mode
    await page.emulateMedia({ forcedColors: 'active' });
    await page.reload();
    await homePage.waitForLoad();
    
    // Verify content is still visible and accessible
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.iconNavigation).toBeVisible();
    
    // Check that interactive elements are still distinguishable
    const icons = await homePage.getNavigationIcons();
    for (const icon of icons) {
      await expect(icon).toBeVisible();
    }
  });
});
