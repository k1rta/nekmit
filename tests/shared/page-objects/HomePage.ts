import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly mainHeading: Locator;
  readonly tagline: Locator;
  readonly valueProposition: Locator;
  readonly iconNavigation: Locator;
  readonly badgeBar: Locator;
  readonly footer: Locator;
  readonly landscapeBanner: Locator;

  // Navigation icons
  readonly resumeIcon: Locator;
  readonly projectsIcon: Locator;
  readonly qualityIcon: Locator;
  readonly uptimeIcon: Locator;
  readonly businessIcon: Locator;
  readonly contactIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Main content elements
    this.mainHeading = page.getByTestId('main-heading');
    this.tagline = page.getByTestId('tagline');
    this.valueProposition = page.getByTestId('value-proposition');
    this.iconNavigation = page.getByTestId('icon-navigation');
    this.badgeBar = page.getByTestId('badge-bar');
    this.footer = page.getByTestId('footer');
    this.landscapeBanner = page.getByTestId('landscape-banner');

    // Navigation icons
    this.resumeIcon = page.getByTestId('icon-resume');
    this.projectsIcon = page.getByTestId('icon-projects');
    this.qualityIcon = page.getByTestId('icon-quality');
    this.uptimeIcon = page.getByTestId('icon-uptime');
    this.businessIcon = page.getByTestId('icon-business');
    this.contactIcon = page.getByTestId('icon-contact');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForLoad() {
    await this.mainHeading.waitFor();
    await this.iconNavigation.waitFor();
  }

  async getNavigationIcons() {
    return [
      this.resumeIcon,
      this.projectsIcon,
      this.qualityIcon,
      this.uptimeIcon,
      this.businessIcon,
      this.contactIcon
    ];
  }

  async getBadges() {
    return this.badgeBar.locator('.badge-hover');
  }

  async verifyBasicLayout() {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.tagline).toBeVisible();
    await expect(this.valueProposition).toBeVisible();
    await expect(this.iconNavigation).toBeVisible();
    await expect(this.footer).toBeVisible();
  }

  async verifyNavigationIcons() {
    const icons = await this.getNavigationIcons();
    for (const icon of icons) {
      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-label');
    }
  }

  async verifyResponsiveLayout(viewport: { width: number; height: number }) {
    await this.page.setViewportSize(viewport);
    await this.verifyBasicLayout();
  }
}
