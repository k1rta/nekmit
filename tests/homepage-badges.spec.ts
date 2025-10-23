import { test, expect } from '@playwright/test';
import { dataTestIds } from './selectors';

test.describe('homepage - badges', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all 5 badges', async ({ page }) => {
    await expect(page.locator(dataTestIds.badgeBar)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeDeployment)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeQuality)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeUx)).toBeVisible();
    await expect(page.locator(dataTestIds.badgePerformance)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeAccessibility)).toBeVisible();
  });

  test('deployment badge should have correct icon and text', async ({ page }) => {
    const badge = page.locator(dataTestIds.badgeDeployment);
    await expect(badge).toContainText('Automated Deployment');
    await expect(badge.locator('i')).toHaveClass(/fa-rocket/);
  });

  test('quality badge should have correct icon and text', async ({ page }) => {
    const badge = page.locator(dataTestIds.badgeQuality);
    await expect(badge).toContainText('Quality Assured');
    await expect(badge.locator('i')).toHaveClass(/fa-vial-circle-check/);
  });

  test('ux badge should have correct icon and text', async ({ page }) => {
    const badge = page.locator(dataTestIds.badgeUx);
    await expect(badge).toContainText('User-Centered Design');
    await expect(badge.locator('i')).toHaveClass(/fa-heart/);
  });

  test('performance badge should have correct icon and text', async ({ page }) => {
    const badge = page.locator(dataTestIds.badgePerformance);
    await expect(badge).toContainText('Lightning Fast');
    await expect(badge.locator('i')).toHaveClass(/fa-zap/);
  });

  test('accessibility badge should have correct icon and text', async ({ page }) => {
    const badge = page.locator(dataTestIds.badgeAccessibility);
    await expect(badge).toContainText('Globally Accessible');
    await expect(badge.locator('i')).toHaveClass(/fa-globe/);
  });

  test('badges should have hover effect class', async ({ page }) => {
    await expect(page.locator(dataTestIds.badgeDeployment)).toHaveClass(/badge-hover/);
    await expect(page.locator(dataTestIds.badgeQuality)).toHaveClass(/badge-hover/);
    await expect(page.locator(dataTestIds.badgeUx)).toHaveClass(/badge-hover/);
    await expect(page.locator(dataTestIds.badgePerformance)).toHaveClass(/badge-hover/);
    await expect(page.locator(dataTestIds.badgeAccessibility)).toHaveClass(/badge-hover/);
  });

  test('badges should be in footer', async ({ page }) => {
    const footer = page.locator(dataTestIds.footer);
    await expect(footer.locator(dataTestIds.badgeBar)).toBeVisible();
  });
});
