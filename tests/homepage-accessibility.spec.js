import { test, expect } from '@playwright/test';
import { dataTestIds, ariaLabels, tooltips } from './selectors.js';

test.describe('homepage - accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all icons should have aria-labels', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute(
      'aria-label',
      ariaLabels.resume
    );
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute(
      'aria-label',
      ariaLabels.projects
    );
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute(
      'aria-label',
      ariaLabels.quality
    );
    await expect(page.locator(dataTestIds.iconUptime)).toHaveAttribute(
      'aria-label',
      ariaLabels.uptime
    );
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute(
      'aria-label',
      ariaLabels.business
    );
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute(
      'aria-label',
      ariaLabels.contact
    );
  });

  test('all icons should have tooltips', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute(
      'data-tooltip',
      tooltips.resume
    );
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute(
      'data-tooltip',
      tooltips.projects
    );
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute(
      'data-tooltip',
      tooltips.quality
    );
    await expect(page.locator(dataTestIds.iconUptime)).toHaveAttribute(
      'data-tooltip',
      tooltips.uptime
    );
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute(
      'data-tooltip',
      tooltips.business
    );
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute(
      'data-tooltip',
      tooltips.contact
    );
  });

  test('all external links should have rel="noopener"', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('rel', 'noopener');
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('rel', 'noopener');
  });

  test('page should have proper heading hierarchy', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
  });
});
