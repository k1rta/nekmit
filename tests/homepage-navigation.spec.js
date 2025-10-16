import { test, expect } from '@playwright/test';
import { dataTestIds, links } from './selectors.js';

test.describe('homepage - navigation icons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all 6 navigation icons', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconNavigation)).toBeVisible();
    await expect(page.locator(dataTestIds.iconResume)).toBeVisible();
    await expect(page.locator(dataTestIds.iconGithub)).toBeVisible();
    await expect(page.locator(dataTestIds.iconTestReports)).toBeVisible();
    await expect(page.locator(dataTestIds.iconHealth)).toBeVisible();
    await expect(page.locator(dataTestIds.iconEmail)).toBeVisible();
    await expect(page.locator(dataTestIds.iconCompany)).toBeVisible();
  });

  test('resume icon should link to pdf', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('href', links.resume);
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('target', '_blank');
  });

  test('github icon should link to correct repository', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconGithub)).toHaveAttribute('href', links.github);
    await expect(page.locator(dataTestIds.iconGithub)).toHaveAttribute('target', '_blank');
  });

  test('test reports icon should link to reports page', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconTestReports)).toHaveAttribute(
      'href',
      links.testReports
    );
    await expect(page.locator(dataTestIds.iconTestReports)).toHaveAttribute('target', '_blank');
  });

  test('health icon should link to health api', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconHealth)).toHaveAttribute('href', links.health);
    await expect(page.locator(dataTestIds.iconHealth)).toHaveAttribute('target', '_blank');
  });

  test('email icon should have correct mailto link', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconEmail)).toHaveAttribute('href', links.email);
  });

  test('company icon should link to estonian business registry', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconCompany)).toHaveAttribute('href', links.company);
    await expect(page.locator(dataTestIds.iconCompany)).toHaveAttribute('target', '_blank');
  });
});
