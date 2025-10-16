import { test, expect } from '@playwright/test';
import { dataTestIds, links, text } from './selectors.js';

test.describe('homepage - core elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Kirta-Linda Karits/);
  });

  test('should display main heading with correct text', async ({ page }) => {
    await expect(page.locator(dataTestIds.mainHeading)).toBeVisible();
    await expect(page.locator(dataTestIds.mainHeading)).toHaveText(text.heading);
  });

  test('should display tagline on desktop', async ({ page }) => {
    await expect(page.locator(dataTestIds.taglineDesktop)).toContainText(text.tagline.part1);
    await expect(page.locator(dataTestIds.taglineDesktop)).toContainText(text.tagline.part2);
    await expect(page.locator(dataTestIds.taglineDesktop)).toContainText(text.tagline.part3);
  });

  test('should display footer with correct links', async ({ page }) => {
    await expect(page.locator(dataTestIds.footer)).toBeVisible();
    await expect(page.locator(dataTestIds.footerText)).toContainText(text.footer);

    const html5upLink = page.locator(dataTestIds.footer).getByRole('link', { name: 'HTML5 UP' });
    await expect(html5upLink).toHaveAttribute('href', links.html5up);
  });
});
