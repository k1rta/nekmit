import { test, expect } from '@playwright/test';
import { dataTestIds, links } from './selectors';

test.describe('homepage - navigation icons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all 5 navigation icons', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconNavigation)).toBeVisible();
    await expect(page.locator(dataTestIds.iconResume)).toBeVisible();
    await expect(page.locator(dataTestIds.iconProjects)).toBeVisible();
    await expect(page.locator(dataTestIds.iconQuality)).toBeVisible();
    await expect(page.locator(dataTestIds.iconBusiness)).toBeVisible();
    await expect(page.locator(dataTestIds.iconContact)).toBeVisible();
  });

  test('resume icon should link to resume page', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('href', links.resume);
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('target', '_blank');
  });

  test('projects icon should link to projects page', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('href', links.projects);
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('target', '_blank');
  });

  test('quality icon should link to test reports page', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute('href', links.quality);
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute('target', '_blank');
  });

  test('business icon should link to business page', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('href', links.business);
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('target', '_blank');
  });

  test('contact icon should link to email', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute('href', links.contact);
  });
});
