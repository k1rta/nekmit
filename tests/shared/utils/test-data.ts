export const VIEWPORTS = {
  MOBILE_PORTRAIT: { width: 375, height: 667 },
  MOBILE_LANDSCAPE: { width: 667, height: 375 },
  TABLET_PORTRAIT: { width: 768, height: 1024 },
  TABLET_LANDSCAPE: { width: 1024, height: 768 },
  DESKTOP_SMALL: { width: 1280, height: 720 },
  DESKTOP_LARGE: { width: 1920, height: 1080 },
} as const;

export const EXPECTED_NAVIGATION_ICONS = [
  {
    testId: 'icon-resume',
    label: 'Resume & Skills',
    tooltip: 'View resume & skills',
    href: '/resume'
  },
  {
    testId: 'icon-projects',
    label: 'Portfolio Projects',
    tooltip: 'View GitHub projects',
    href: 'https://github.com/k1rta?tab=repositories'
  },
  {
    testId: 'icon-quality',
    label: 'Quality Dashboard',
    tooltip: 'View test reports',
    href: '/test-reports/index.html'
  },
  {
    testId: 'icon-uptime',
    label: 'System Uptime',
    tooltip: 'Check system health',
    href: '/api/health'
  },
  {
    testId: 'icon-business',
    label: 'About My Business',
    tooltip: 'View company details',
    href: 'https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C'
  },
  {
    testId: 'icon-contact',
    label: 'Contact & Availability',
    tooltip: 'Send email',
    href: 'mailto:kirtalindakarits@icloud.com'
  }
] as const;

export const EXPECTED_BADGES = [
  'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker',
  'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL',
  'REST API', 'Microservices', 'CI/CD', 'Testing', 'Agile'
] as const;

export const PERFORMANCE_THRESHOLDS = {
  FIRST_CONTENTFUL_PAINT: 1500,
  LARGEST_CONTENTFUL_PAINT: 2500,
  CUMULATIVE_LAYOUT_SHIFT: 0.1,
  FIRST_INPUT_DELAY: 100
} as const;
