import { test, expect } from '@playwright/test';
import { s } from '../selectors';

/**
 * Integration Tests - API Integration
 *
 * Tests integration with external APIs and services.
 * Run on PR creation to ensure API integrations work.
 */

test.describe('Integration Tests - API Integration', () => {
  test('Status page API integration works correctly', async ({ page }) => {
    await page.goto('/status');

    // Wait for page to load
    await expect(page.locator(s.statusCard)).toBeVisible();

    // Wait for API call to complete and status indicator to show
    await expect(page.locator(s.statusIndicator)).toBeVisible({ timeout: 15000 });

    // Verify JSON content is loaded and displayed
    const jsonContent = page.locator(s.jsonContent);
    await expect(jsonContent).toBeVisible({ timeout: 15000 });

    // Verify the content contains expected API response structure
    const jsonText = await jsonContent.textContent();
    expect(jsonText).toBeTruthy();

    // Basic validation that it looks like JSON
    expect(jsonText).toMatch(/[{}\[\]]/);
  });

  test('Health API endpoint responds correctly', async ({ page, baseURL }) => {
    // Skip this test for local development since Vite doesn't serve API routes
    // Only run when testing against actual deployments (Vercel, etc.)
    const isLocalDevelopment = Boolean(
      baseURL?.includes('localhost') || baseURL?.includes('127.0.0.1')
    );
    test.skip(
      isLocalDevelopment,
      'API routes not available in local Vite server - only available in deployed environments'
    );

    // Test the health endpoint directly
    const response = await page.request.get('/api/health');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('status');
    expect(responseBody.status).toBe('ok');
  });

  test('Status page handles API errors gracefully', async ({ page }) => {
    // Navigate to status page
    await page.goto('/status');

    // Even if API fails, the page structure should be intact
    await expect(page.locator(s.statusCard)).toBeVisible();
    await expect(page.locator(s.backButton)).toBeVisible();

    // Status indicator should eventually show (either success or error state)
    await expect(page.locator(s.statusIndicator)).toBeVisible({ timeout: 20000 });
  });

  test('External links have correct security attributes', async ({ page }) => {
    await page.goto('/');

    // Test that all links have proper security attributes
    const allLinks = [s.iconGithub, s.iconResume, s.iconTestReport, s.iconCompany, s.iconContact];

    for (const linkSelector of allLinks) {
      const link = page.locator(linkSelector);
      await expect(link).toBeVisible();

      // All links should have rel="noopener noreferrer" for security
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');

      // Verify they have proper titles for accessibility
      const title = await link.getAttribute('title');
      expect(title).toBeTruthy();
    }
  });
});
