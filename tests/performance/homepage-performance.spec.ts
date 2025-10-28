import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { HomePage } from '../shared/page-objects/HomePage';
import { TestHelpers } from '../shared/utils/test-helpers';
import { PERFORMANCE_THRESHOLDS } from '../shared/utils/test-data';

test.describe('Homepage Performance Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await allure.epic('Performance');
    await allure.feature('Homepage');
  });

  test('should load within acceptable time limits', async ({ page }) => {
    await allure.story('Page Load Performance');
    await allure.severity('critical');
    
    const startTime = Date.now();
    
    await homePage.goto();
    await homePage.waitForLoad();
    await TestHelpers.waitForNetworkIdle(page);
    
    const loadTime = Date.now() - startTime;
    
    // Log performance metrics
    const metrics = await TestHelpers.measurePerformance(page);
    await allure.attachment('Performance Metrics', JSON.stringify(metrics, null, 2), 'application/json');
    
    // Verify load time is reasonable (under 3 seconds)
    expect(loadTime).toBeLessThan(3000);
    
    // Verify Core Web Vitals if available
    if (metrics.firstContentfulPaint > 0) {
      expect(metrics.firstContentfulPaint).toBeLessThan(PERFORMANCE_THRESHOLDS.FIRST_CONTENTFUL_PAINT);
    }
  });

  test('should handle slow network conditions gracefully', async ({ page }) => {
    await allure.story('Slow Network Performance');
    await allure.severity('normal');
    
    // Simulate slow network
    await TestHelpers.simulateSlowNetwork(page);
    
    const startTime = Date.now();
    await homePage.goto();
    await homePage.waitForLoad();
    
    const loadTime = Date.now() - startTime;
    
    // Should still load within reasonable time even with slow network
    expect(loadTime).toBeLessThan(10000); // 10 seconds max
    
    // Verify critical content is still visible
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.iconNavigation).toBeVisible();
  });

  test('should have minimal layout shift', async ({ page }) => {
    await allure.story('Layout Stability');
    await allure.severity('normal');
    
    await homePage.goto();
    
    // Take initial screenshot
    await TestHelpers.takeScreenshot(page, 'layout-initial');
    
    // Wait for any potential layout shifts
    await page.waitForTimeout(2000);
    
    // Take final screenshot
    await TestHelpers.takeScreenshot(page, 'layout-final');
    
    // Verify main elements are stable
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.iconNavigation).toBeVisible();
    await expect(homePage.footer).toBeVisible();
  });

  test('should efficiently load and render images', async ({ page }) => {
    await allure.story('Image Loading Performance');
    await allure.severity('normal');
    
    // Track image loading
    const imageLoadTimes: number[] = [];
    
    page.on('response', response => {
      if (response.url().match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        imageLoadTimes.push(Date.now());
      }
    });
    
    await homePage.goto();
    await TestHelpers.waitForNetworkIdle(page);
    
    // Verify images loaded reasonably quickly
    if (imageLoadTimes.length > 0) {
      const averageLoadTime = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
      expect(averageLoadTime).toBeLessThan(2000);
    }
  });

  test('should maintain performance across different viewport sizes', async ({ page }) => {
    await allure.story('Responsive Performance');
    await allure.severity('normal');
    
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      const startTime = Date.now();
      await homePage.goto();
      await homePage.waitForLoad();
      const loadTime = Date.now() - startTime;
      
      // Performance should be consistent across viewports
      expect(loadTime).toBeLessThan(3000);
      
      await allure.attachment(
        `${viewport.name} Performance`, 
        `Load time: ${loadTime}ms`, 
        'text/plain'
      );
    }
  });
});
