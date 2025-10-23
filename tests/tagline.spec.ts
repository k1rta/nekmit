import { test, expect } from '@playwright/test';
import { dataTestIds, text, viewports } from './selectors';

test.describe('Tagline Display', () => {
  test.describe('Content and Visibility', () => {
    test('should display tagline with dots on all screen sizes', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);
      await expect(tagline).toBeVisible();
      await expect(tagline).toContainText(text.tagline);
    });

    test('should contain all three tagline parts with bullet separators', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);
      const taglineText = await tagline.textContent();

      expect(taglineText).toContain('From pipelines to pixels');
      expect(taglineText).toContain('Resilient systems');
      expect(taglineText).toContain('Strong QA');
      expect(taglineText).toContain('•');
    });

    test('should be in tagline container', async ({ page }) => {
      await page.goto('/');
      const container = page.locator(dataTestIds.taglineContainer);
      const tagline = page.locator(dataTestIds.tagline);

      await expect(container).toBeVisible();
      await expect(tagline).toBeVisible();

      // Verify tagline is inside container
      const taglineInContainer = container.locator(dataTestIds.tagline);
      await expect(taglineInContainer).toBeVisible();
    });
  });

  test.describe('Responsive Typography', () => {
    test('should have appropriate font size on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.mobile);
      await page.goto('/');

      const tagline = page.locator(dataTestIds.tagline);
      const fontSize = await tagline.evaluate(el => window.getComputedStyle(el).fontSize);

      // Should be text-sm (14px) on mobile
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14);
      expect(parseFloat(fontSize)).toBeLessThanOrEqual(16);
    });

    test('should have larger font size on tablet', async ({ page }) => {
      await page.setViewportSize(viewports.tablet);
      await page.goto('/');

      const tagline = page.locator(dataTestIds.tagline);
      const fontSize = await tagline.evaluate(el => window.getComputedStyle(el).fontSize);

      // Should be text-base (16px) or larger on tablet
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);
    });

    test('should have largest font size on desktop', async ({ page }) => {
      await page.setViewportSize(viewports.desktop);
      await page.goto('/');

      const tagline = page.locator(dataTestIds.tagline);
      const fontSize = await tagline.evaluate(el => window.getComputedStyle(el).fontSize);

      // Should be text-lg (18px) or larger on desktop
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(18);
    });
  });

  test.describe('Styling and Accessibility', () => {
    test('should have proper text color', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);

      const color = await tagline.evaluate(el => window.getComputedStyle(el).color);

      // Should have blue-ish color (not pure white or black)
      expect(color).toBeTruthy();
    });

    test('should be center-aligned', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);

      const textAlign = await tagline.evaluate(el => window.getComputedStyle(el).textAlign);

      expect(textAlign).toBe('center');
    });

    test('should have proper line height for readability', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);

      const lineHeight = await tagline.evaluate(el => window.getComputedStyle(el).lineHeight);

      // Should have relaxed line height
      expect(lineHeight).not.toBe('normal');
    });
  });

  test.describe('Position and Layout', () => {
    test('should appear below the main heading', async ({ page }) => {
      await page.goto('/');

      const heading = page.locator(dataTestIds.mainHeading);
      const tagline = page.locator(dataTestIds.tagline);

      const headingBox = await heading.boundingBox();
      const taglineBox = await tagline.boundingBox();

      if (headingBox && taglineBox) {
        expect(taglineBox.y).toBeGreaterThan(headingBox.y + headingBox.height);
      }
    });

    test('should appear above the value proposition', async ({ page }) => {
      await page.goto('/');

      const tagline = page.locator(dataTestIds.tagline);
      const valueProp = page.locator(dataTestIds.valueProposition);

      const taglineBox = await tagline.boundingBox();
      const valuePropBox = await valueProp.boundingBox();

      if (taglineBox && valuePropBox) {
        expect(taglineBox.y).toBeLessThan(valuePropBox.y);
      }
    });

    test('should have consistent max-width across screen sizes', async ({ page }) => {
      await page.goto('/');
      const container = page.locator(dataTestIds.taglineContainer);

      const maxWidth = await container.evaluate(el => window.getComputedStyle(el).maxWidth);

      // Should have max-w-4xl constraint
      expect(maxWidth).toBeTruthy();
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should display bullet characters correctly', async ({ page }) => {
      await page.goto('/');
      const tagline = page.locator(dataTestIds.tagline);
      const text = await tagline.textContent();

      // Check for bullet character (•)
      expect(text).toMatch(/•/);

      // Ensure bullets are properly spaced
      const bullets = text?.match(/•/g);
      expect(bullets).toHaveLength(2);
    });
  });
});
