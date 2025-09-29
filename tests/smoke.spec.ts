import { test, expect } from '@playwright/test';

// Core smoke: page renders and key elements exist

test('landing renders header, taglines, icons, and footer', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('header')).toBeVisible();
  await expect(page.getByTestId('title')).toHaveText(/Kirta/i);
  await expect(page.getByTestId('tagline-1')).toBeVisible();
  await expect(page.getByTestId('tagline-2')).toBeVisible();
  await expect(page.getByTestId('tagline-3')).toBeVisible();

  const icons = page.getByTestId('icon-list').locator('li');
  await expect(icons).toHaveCount(6);

  await expect(page.getByTestId('footer')).toBeVisible();
});
