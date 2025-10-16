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
  iconGithub: '[data-testid="icon-github"]',
  iconTestReports: '[data-testid="icon-test-reports"]',
  iconHealth: '[data-testid="icon-health"]',
  iconEmail: '[data-testid="icon-email"]',
  iconCompany: '[data-testid="icon-company"]',

  // Footer
  footer: '[data-testid="footer"]',
  footerText: '[data-testid="footer-text"]',
};

/**
 * Expected URLs and links
 */
export const links = {
  resume: '/resume.pdf',
  github: 'https://github.com/k1rta/nekmit',
  testReports: '/test-reports/index.html',
  health: '/api-docs.html',
  healthApi: '/api/health',
  email: 'mailto:kirtalindakarits@icloud.com',
  company: 'https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C',
  html5up: 'https://html5up.net/',
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
  footer: '© Nekmit LLC',
};

/**
 * ARIA labels
 */
export const ariaLabels = {
  resume: 'Resume',
  github: 'GitHub',
  testReports: 'Test Reports',
  health: 'API Documentation',
  email: 'Email',
  company: 'Company',
};

/**
 * Tooltips (data-tooltip attributes)
 */
export const tooltips = {
  resume: 'Download my resume & CV',
  github: 'View my open source projects',
  testReports: 'Live Playwright test results',
  health: 'View Health API documentation',
  email: 'Get in touch via email',
  company: 'View company details & registration',
};

/**
 * Viewport sizes for responsive testing
 */
export const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};
