import { test, expect } from '@playwright/test';
import { dataTestIds } from './selectors';

test.describe('homepage - layout and visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('main content should be centered', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Verify content is centered by checking computed style
    const textAlign = await main.evaluate(el => window.getComputedStyle(el).textAlign);
    expect(textAlign).toBe('center');
  });

  test('heading should be prominently styled and visible', async ({ page }) => {
    const heading = page.locator(dataTestIds.mainHeading);
    await expect(heading).toBeVisible();

    // Verify heading is large and prominent
    const fontSize = await heading.evaluate(el => window.getComputedStyle(el).fontSize);
    const fontSizeNum = parseFloat(fontSize);
    expect(fontSizeNum).toBeGreaterThan(50); // Should be large
  });

  test('icons should be interactive and visible', async ({ page }) => {
    const icons = [dataTestIds.iconResume, dataTestIds.iconProjects, dataTestIds.iconQuality];

    for (const iconSelector of icons) {
      const icon = page.locator(iconSelector);
      await expect(icon).toBeVisible();
      await expect(icon).toBeEnabled();
    }
  });

  test('icons should have consistent dimensions', async ({ page }) => {
    const icon = page.locator(dataTestIds.iconResume);
    await expect(icon).toBeVisible();

    // Verify icon has equal width and height (circular)
    const box = await icon.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeCloseTo(box.height, 0); // Width equals height
    }
  });

  test('footer should be visible at bottom of viewport', async ({ page }) => {
    const footer = page.locator(dataTestIds.footer);
    await expect(footer).toBeVisible();

    // Verify footer is at bottom by checking position
    const position = await footer.evaluate(el => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');

    const box = await footer.boundingBox();
    const viewport = page.viewportSize();
    if (box && viewport) {
      expect(box.y + box.height).toBeGreaterThan(viewport.height * 0.8); // Near bottom
    }
  });

  test('badges should be visible and readable', async ({ page }) => {
    const badges = [dataTestIds.badgeDeployment, dataTestIds.badgeQuality, dataTestIds.badgeUx];

    for (const badgeSelector of badges) {
      const badge = page.locator(badgeSelector);
      await expect(badge).toBeVisible();
      // Verify badge has text content
      const text = await badge.textContent();
      expect((text ?? '').length).toBeGreaterThan(0);
    }
  });

  test('value proposition should be visible', async ({ page }) => {
    const valueProp = page.locator('[data-testid="value-proposition"]');
    await expect(valueProp).toBeVisible();
    await expect(valueProp).toContainText('fast, maintainable websites');
    await expect(valueProp).toContainText('automated testing');
    await expect(valueProp).toContainText('CI/CD pipelines');
  });

  test('icon navigation should be in a nav element', async ({ page }) => {
    const nav = page.locator(dataTestIds.iconNavigation);
    await expect(nav).toHaveCount(1);
    const tagName = await nav.evaluate(el => el.tagName.toLowerCase());
    expect(tagName).toBe('nav');
  });

  test('all icons should have consistent sizing', async ({ page }) => {
    const icons = [
      dataTestIds.iconResume,
      dataTestIds.iconProjects,
      dataTestIds.iconQuality,
      dataTestIds.iconBusiness,
      dataTestIds.iconContact,
    ];

    // Get dimensions of first icon as reference
    const firstIconSelector = icons[0];
    if (!firstIconSelector) return;

    const firstIcon = page.locator(firstIconSelector);
    const firstBox = await firstIcon.boundingBox();

    if (!firstBox) return;

    // Verify all icons have same dimensions
    for (const iconSelector of icons) {
      const icon = page.locator(iconSelector);
      const box = await icon.boundingBox();
      if (box) {
        expect(box.width).toBeCloseTo(firstBox.width, 1);
        expect(box.height).toBeCloseTo(firstBox.height, 1);
      }
    }
  });

  test('badges should be accessible on smaller screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const badgeBar = page.locator(dataTestIds.badgeBar);
    await expect(badgeBar).toBeVisible();

    // All badges should still be visible on mobile
    await expect(page.locator(dataTestIds.badgeDeployment)).toBeVisible();
    await expect(page.locator(dataTestIds.badgeQuality)).toBeVisible();
  });
});
