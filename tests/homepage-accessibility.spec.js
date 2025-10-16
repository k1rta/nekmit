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
    await expect(page.locator(dataTestIds.iconGithub)).toHaveAttribute(
      'aria-label',
      ariaLabels.github
    );
    await expect(page.locator(dataTestIds.iconTestReports)).toHaveAttribute(
      'aria-label',
      ariaLabels.testReports
    );
    await expect(page.locator(dataTestIds.iconHealth)).toHaveAttribute(
      'aria-label',
      ariaLabels.health
    );
    await expect(page.locator(dataTestIds.iconEmail)).toHaveAttribute(
      'aria-label',
      ariaLabels.email
    );
    await expect(page.locator(dataTestIds.iconCompany)).toHaveAttribute(
      'aria-label',
      ariaLabels.company
    );
  });

  test('all icons should have tooltips', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute(
      'data-tooltip',
      tooltips.resume
    );
    await expect(page.locator(dataTestIds.iconGithub)).toHaveAttribute(
      'data-tooltip',
      tooltips.github
    );
    await expect(page.locator(dataTestIds.iconTestReports)).toHaveAttribute(
      'data-tooltip',
      tooltips.testReports
    );
    await expect(page.locator(dataTestIds.iconHealth)).toHaveAttribute(
      'data-tooltip',
      tooltips.health
    );
    await expect(page.locator(dataTestIds.iconEmail)).toHaveAttribute(
      'data-tooltip',
      tooltips.email
    );
    await expect(page.locator(dataTestIds.iconCompany)).toHaveAttribute(
      'data-tooltip',
      tooltips.company
    );
  });

  test('all external links should have rel="noopener"', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconGithub)).toHaveAttribute('rel', 'noopener');
    await expect(page.locator(dataTestIds.iconCompany)).toHaveAttribute('rel', 'noopener');
  });

  test('page should have proper heading hierarchy', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
  });
});
