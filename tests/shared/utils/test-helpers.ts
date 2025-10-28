import { Page, expect } from '@playwright/test';
import { VIEWPORTS } from './test-data';

export class TestHelpers {
  static async setMobileViewport(page: Page) {
    await page.setViewportSize(VIEWPORTS.MOBILE_PORTRAIT);
  }

  static async setTabletViewport(page: Page) {
    await page.setViewportSize(VIEWPORTS.TABLET_PORTRAIT);
  }

  static async setDesktopViewport(page: Page) {
    await page.setViewportSize(VIEWPORTS.DESKTOP_LARGE);
  }

  static async verifyAccessibility(page: Page) {
    // Basic accessibility checks
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);

    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      await expect(img).toHaveAttribute('alt');
    }

    // Check for aria-labels on interactive elements without text
    const interactiveElements = await page.locator('button, a, input, select, textarea').all();
    for (const element of interactiveElements) {
      const text = await element.textContent();
      if (!text?.trim()) {
        await expect(element).toHaveAttribute('aria-label');
      }
    }
  }

  static async measurePerformance(page: Page) {
    const performanceMetrics = await page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      // eslint-disable-next-line no-undef
      const paint = performance.getEntriesByType('paint');
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      };
    });

    return performanceMetrics;
  }

  static async takeScreenshot(page: Page, name: string) {
    await page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }

  static async waitForNetworkIdle(page: Page, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  static async simulateSlowNetwork(page: Page) {
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
  }

  static async verifyTooltip(page: Page, triggerElement: string, expectedText: string) {
    await page.hover(triggerElement);
    await page.waitForTimeout(500); // Wait for tooltip animation
    
    const tooltip = page.locator('.tippy-box[data-theme~="custom"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText(expectedText);
    
    // Move away to hide tooltip
    await page.hover('body');
    await expect(tooltip).not.toBeVisible();
  }
}
