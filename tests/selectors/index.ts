// Centralized selectors for Playwright tests (folder module)
// Prefer stable data-testid hooks from index.html

export const s = {
  // Structure
  wrapper: '[data-testid="wrapper"]',
  bg: '[data-testid="bg"]',
  main: '[data-testid="main"]',
  header: '[data-testid="header"]',
  title: '[data-testid="title"]',

  // Taglines
  tagline1: '[data-testid="tagline-1"]',
  tagline2: '[data-testid="tagline-2"]',
  tagline3: '[data-testid="tagline-3"]',

  // Icons
  iconList: '[data-testid="icon-list"]',
  icons: '[data-testid="icon-list"] li',
  iconResume: '[data-testid="icon-resume"]',
  iconGithub: '[data-testid="icon-github"]',
  iconTestReport: '[data-testid="icon-test-report"]',
  iconHealth: '[data-testid="icon-health"]',
  iconContact: '[data-testid="icon-contact"]',
  iconCompany: '[data-testid="icon-company"]',

  // Footer
  footer: '[data-testid="footer"]',

  // A11y
  skipLink: 'a.skip-link',
};
