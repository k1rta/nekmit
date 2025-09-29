import { test, expect } from '@playwright/test';
import { s } from './selectors';

// Core smoke: page renders and key elements exist

test('landing renders header, taglines, icons, and footer', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator(s.header)).toBeVisible();
  await expect(page.locator(s.title)).toHaveText(/Kirta/i);
  await expect(page.locator(s.tagline1)).toBeVisible();
  await expect(page.locator(s.tagline2)).toBeVisible();
  await expect(page.locator(s.tagline3)).toBeVisible();

  await expect(page.locator(s.icons)).toHaveCount(6);

  await expect(page.locator(s.footer)).toBeVisible();
});
