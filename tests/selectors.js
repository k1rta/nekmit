/**
 * Centralized test selectors for the portfolio
 * All data-testid attribute selectors used in E2E tests
 */

export const dataTestIds = {
  // Main content
  mainHeading: '[data-testid="main-heading"]',
  taglineContainer: '[data-testid="tagline-container"]',
  taglineDesktop: '[data-testid="tagline-desktop"]',
  taglineMobile: '[data-testid="tagline-mobile"]',

  // Navigation
  iconNavigation: '[data-testid="icon-navigation"]',
  iconResume: '[data-testid="icon-resume"]',
  iconProjects: '[data-testid="icon-projects"]',
  iconQuality: '[data-testid="icon-quality"]',
  iconUptime: '[data-testid="icon-uptime"]',
  iconBusiness: '[data-testid="icon-business"]',
  iconContact: '[data-testid="icon-contact"]',

  // Footer
  footer: '[data-testid="footer"]',
  badgeBar: '[data-testid="badge-bar"]',
  badgeDeployment: '[data-testid="badge-deployment"]',
  badgeQuality: '[data-testid="badge-quality"]',
  badgeUx: '[data-testid="badge-ux"]',
  badgePerformance: '[data-testid="badge-performance"]',
  badgeAccessibility: '[data-testid="badge-accessibility"]',
};

/**
 * Expected URLs and links
 */
export const links = {
  resume: '/resume',
  projects: 'https://github.com/k1rta?tab=repositories',
  quality: '/test-reports/index.html',
  uptime: '/api/health',
  business: 'https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C',
  contact: 'mailto:kirtalindakarits@icloud.com',
};

/**
 * Expected text content
 */
export const text = {
  heading: 'Kirta-Linda Karits',
  tagline: {
    part1: 'From pipelines to pixels',
    part2: 'Building resilient, automated systems',
    part3: 'Strong QA mindset',
  },
};

/**
 * ARIA labels
 */
export const ariaLabels = {
  resume: 'Resume & Skills',
  projects: 'Portfolio Projects',
  quality: 'Quality Dashboard',
  uptime: 'System Uptime',
  business: 'About My Business',
  contact: 'Contact & Availability',
};

/**
 * Tooltips (data-tooltip attributes)
 */
export const tooltips = {
  resume: 'View resume & skills',
  projects: 'View GitHub projects',
  quality: 'View test reports',
  uptime: 'Check system health',
  business: 'View company details',
  contact: 'Send email',
};

/**
 * Viewport sizes for responsive testing
 */
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};
