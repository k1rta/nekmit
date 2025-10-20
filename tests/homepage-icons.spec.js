import { test, expect } from '@playwright/test';
import { dataTestIds, links, ariaLabels } from './selectors.js';

test.describe('homepage - icon functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all icons should have visible icon graphics', async ({ page }) => {
    const icons = [
      dataTestIds.iconResume,
      dataTestIds.iconProjects,
      dataTestIds.iconQuality,
      dataTestIds.iconUptime,
      dataTestIds.iconBusiness,
      dataTestIds.iconContact,
    ];

    for (const iconSelector of icons) {
      const iconElement = page.locator(`${iconSelector} i`);
      await expect(iconElement).toBeVisible();

      // Verify icon has content (not empty)
      const hasContent = await iconElement.evaluate(el => {
        const styles = window.getComputedStyle(el, '::before');
        return styles.content !== 'none' && styles.content !== '';
      });
      expect(hasContent).toBeTruthy();
    }
  });

  test('all icons should be visually styled', async ({ page }) => {
    const iconElements = page.locator('[data-testid^="icon-"] i');
    const count = await iconElements.count();

    for (let i = 0; i < count; i++) {
      const icon = iconElements.nth(i);
      await expect(icon).toBeVisible();

      // Verify icon has a reasonable font size
      const fontSize = await icon.evaluate(el => window.getComputedStyle(el).fontSize);
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(20); // Icons should be visible size
    }
  });

  test('external links should open in new tab', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('target', '_blank');
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('target', '_blank');
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute('target', '_blank');
    await expect(page.locator(dataTestIds.iconUptime)).toHaveAttribute('target', '_blank');
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('target', '_blank');
  });

  test('contact icon should be mailto link without target', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute('href', links.contact);
    await expect(page.locator(dataTestIds.iconContact)).not.toHaveAttribute('target');
  });

  test('icons should have correct href attributes', async ({ page }) => {
    await expect(page.locator(dataTestIds.iconResume)).toHaveAttribute('href', links.resume);
    await expect(page.locator(dataTestIds.iconProjects)).toHaveAttribute('href', links.projects);
    await expect(page.locator(dataTestIds.iconQuality)).toHaveAttribute('href', links.quality);
    await expect(page.locator(dataTestIds.iconUptime)).toHaveAttribute('href', links.uptime);
    await expect(page.locator(dataTestIds.iconBusiness)).toHaveAttribute('href', links.business);
    await expect(page.locator(dataTestIds.iconContact)).toHaveAttribute('href', links.contact);
  });

  test('icons should be keyboard accessible', async ({ page }) => {
    // Tab through icons
    await page.keyboard.press('Tab');
    const resumeIcon = page.locator(dataTestIds.iconResume);
    await expect(resumeIcon).toBeFocused();

    await page.keyboard.press('Tab');
    const projectsIcon = page.locator(dataTestIds.iconProjects);
    await expect(projectsIcon).toBeFocused();
  });

  test('all icons should be clickable', async ({ page }) => {
    const icons = [
      dataTestIds.iconResume,
      dataTestIds.iconProjects,
      dataTestIds.iconQuality,
      dataTestIds.iconUptime,
      dataTestIds.iconBusiness,
      dataTestIds.iconContact,
    ];

    for (const iconSelector of icons) {
      await expect(page.locator(iconSelector)).toBeEnabled();
    }
  });

  test('icon navigation should contain exactly 6 icons', async ({ page }) => {
    const nav = page.locator(dataTestIds.iconNavigation);
    const iconCount = await nav.locator('a').count();
    expect(iconCount).toBe(6);
  });

  test('icons should respond to hover interactions', async ({ page }) => {
    const iconSelectors = [
      dataTestIds.iconResume,
      dataTestIds.iconProjects,
      dataTestIds.iconQuality,
    ];

    for (const iconSelector of iconSelectors) {
      const icon = page.locator(iconSelector);

      // Get initial position
      const initialBox = await icon.boundingBox();

      // Hover over icon
      await icon.hover();
      await page.waitForTimeout(100);

      // Icon should still be visible and interactable after hover
      await expect(icon).toBeVisible();
      await expect(icon).toBeEnabled();
    }
  });
});
