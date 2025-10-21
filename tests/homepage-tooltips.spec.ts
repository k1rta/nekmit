import { test, expect } from '@playwright/test';
import { dataTestIds, tooltips } from './selectors';

test.describe('homepage - tooltips', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all icons should have data-tooltip attributes', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('data-tooltip');
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('data-tooltip');
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute('data-tooltip');
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('data-tooltip');
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute('data-tooltip');
  });

  test('tooltip should appear on hover', async ({ page }) => {
    const resumeIcon = page.locator(dataTestIds.iconResume);
    const tooltipText = await resumeIcon.getAttribute('data-tooltip');

    // Hover over icon
    await resumeIcon.hover();
    await page.waitForTimeout(300);

    // Verify tooltip text is visible somewhere on page
    const tooltipContent = page.getByText(tooltipText ?? '', { exact: true });
    await expect(tooltipContent).toBeVisible();
  });

  test('tooltip should contain correct text', async ({ page }) => {
    const resumeIcon = page.locator(dataTestIds.iconResume);
    await resumeIcon.hover();
    await page.waitForTimeout(300);

    // Verify the expected tooltip text is visible
    const tooltipContent = page.getByText(tooltips.resume, { exact: true });
    await expect(tooltipContent).toBeVisible();
  });

  test('tooltip should disappear when mouse leaves', async ({ page }) => {
    const resumeIcon = page.locator(dataTestIds.iconResume);
    const tooltipText = await resumeIcon.getAttribute('data-tooltip');

    // Show tooltip
    await resumeIcon.hover();
    await page.waitForTimeout(300);

    // Verify tooltip is visible
    await expect(page.getByText(tooltipText ?? '', { exact: true })).toBeVisible();

    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    // Tooltip text should no longer be visible
    await expect(page.getByText(tooltipText ?? '', { exact: true })).toBeHidden();
  });

  test('tooltips should work for all icons', async ({ page }) => {
    const icons = [
      { selector: dataTestIds.iconResume, text: tooltips.resume },
      { selector: dataTestIds.iconProjects, text: tooltips.projects },
      { selector: dataTestIds.iconQuality, text: tooltips.quality },
      { selector: dataTestIds.iconBusiness, text: tooltips.business },
      { selector: dataTestIds.iconContact, text: tooltips.contact },
    ];

    for (const icon of icons) {
      // Hover over icon
      await page.locator(icon.selector).hover();
      await page.waitForTimeout(300);

      // Verify tooltip text appears
      const tooltipContent = page.getByText(icon.text, { exact: true });
      await expect(tooltipContent).toBeVisible();

      // Move away
      await page.mouse.move(0, 0);
      await page.waitForTimeout(200);
    }
  });
});
