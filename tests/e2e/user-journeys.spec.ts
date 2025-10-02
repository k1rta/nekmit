import { test, expect } from '@playwright/test';
import { s } from '../selectors';

/**
 * End-to-End Tests - User Journeys
 *
 * These tests simulate complete user workflows and interactions.
 * Run on PR creation and major releases.
 */

test.describe('E2E Tests - User Journeys', () => {
  test('Complete user journey: Homepage → Status → Back', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Kirta/i);

    // Navigate to status page via icon
    const statusIcon = page.locator(s.iconHealth);
    await statusIcon.click();

    // Verify status page loads
    await expect(page).toHaveTitle('Status');
    await expect(page.locator(s.statusCard)).toBeVisible();

    // Wait for API data to load
    await expect(page.locator(s.statusIndicator)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(s.jsonContent)).toBeVisible({ timeout: 10000 });

    // Navigate back to homepage
    const backButton = page.locator(s.backButton);
    await backButton.click();

    // Verify we're back on homepage
    await expect(page).toHaveTitle(/Kirta/i);
    await expect(page.locator(s.header)).toBeVisible();
  });

  test('External link navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Test GitHub icon has proper attributes (href is placeholder for now)
    const githubIcon = page.locator(s.iconGithub);
    await expect(githubIcon).toBeVisible();
    await expect(githubIcon).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(githubIcon).toHaveAttribute('title', 'View my projects on GitHub');

    // Test resume icon has proper attributes (href is placeholder for now)
    const resumeIcon = page.locator(s.iconResume);
    await expect(resumeIcon).toBeVisible();
    await expect(resumeIcon).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(resumeIcon).toHaveAttribute('title', 'Download my resume');
  });

  test('Test report link navigation', async ({ page }) => {
    await page.goto('/');

    const testReportIcon = page.locator(s.iconTestReport);
    await expect(testReportIcon).toBeVisible();
    await expect(testReportIcon).toHaveAttribute(
      'href',
      'https://k1rta.github.io/nekmit/reports/main/latest/'
    );
    await expect(testReportIcon).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(testReportIcon).toHaveAttribute('title', 'See the latest automated test report');
  });

  test('Contact functionality works', async ({ page }) => {
    await page.goto('/');

    const contactIcon = page.locator(s.iconContact);
    await expect(contactIcon).toBeVisible();

    // Verify it's a mailto link
    const href = await contactIcon.getAttribute('href');
    expect(href).toMatch(/^mailto:/);
  });
});
