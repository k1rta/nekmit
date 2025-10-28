# Test Architecture & Organization

This document outlines the comprehensive test structure for the portfolio project, organized by test types and responsibilities.

## 📁 Directory Structure

```
tests/
├── shared/                 # Shared utilities and page objects
│   ├── page-objects/      # Page Object Model classes
│   ├── utils/             # Test helpers and utilities
│   └── fixtures/          # Test data and fixtures
├── unit/                  # Unit tests (isolated component testing)
├── integration/           # Integration tests (component interactions)
├── e2e/                   # End-to-end tests
│   ├── homepage/          # Homepage-specific E2E tests
│   └── components/        # Component-specific E2E tests
├── performance/           # Performance and load testing
├── accessibility/         # Accessibility compliance tests
├── api/                   # API endpoint testing
├── visual/                # Visual regression testing
└── legacy-backup/         # Archived old test files
```

## 🧪 Test Types & Responsibilities

### Unit Tests (`tests/unit/`)
- **Purpose**: Test individual functions and components in isolation
- **Scope**: Pure functions, utility methods, isolated component logic
- **Tools**: Jest/Vitest for JavaScript/TypeScript unit testing
- **Coverage Target**: >90%

### Integration Tests (`tests/integration/`)
- **Purpose**: Test component interactions and data flow
- **Scope**: Component integration, state management, API integration
- **Tools**: Playwright with component testing
- **Coverage Target**: >80%

### End-to-End Tests (`tests/e2e/`)
- **Purpose**: Test complete user workflows and scenarios
- **Scope**: Full page interactions, user journeys, cross-browser testing
- **Organization**:
  - `homepage/`: Homepage-specific functionality
  - `components/`: Reusable component behaviors
- **Tools**: Playwright with full browser automation
- **Coverage Target**: Critical user paths (100%)

### Performance Tests (`tests/performance/`)
- **Purpose**: Validate performance metrics and load times
- **Scope**: Page load performance, Core Web Vitals, resource optimization
- **Metrics**:
  - First Contentful Paint < 1.5s
  - Largest Contentful Paint < 2.5s
  - Cumulative Layout Shift < 0.1
- **Tools**: Playwright with performance API

### Accessibility Tests (`tests/accessibility/`)
- **Purpose**: Ensure WCAG 2.1 AA compliance
- **Scope**: Screen reader compatibility, keyboard navigation, color contrast
- **Standards**: WCAG 2.1 Level AA
- **Tools**: Playwright with axe-core integration

### API Tests (`tests/api/`)
- **Purpose**: Test backend API endpoints and responses
- **Scope**: Health checks, data validation, error handling
- **Tools**: Playwright request context
- **Coverage**: All API endpoints

### Visual Tests (`tests/visual/`)
- **Purpose**: Detect visual regressions across browsers and devices
- **Scope**: Layout consistency, responsive design, cross-browser compatibility
- **Tools**: Playwright visual comparisons

## 🛠 Test Utilities

### Page Objects (`tests/shared/page-objects/`)
- **HomePage.ts**: Main page interactions and elements
- Encapsulates page-specific logic and selectors
- Provides reusable methods for common operations

### Test Helpers (`tests/shared/utils/`)
- **test-helpers.ts**: Common test utilities and assertions
- **test-data.ts**: Test constants and expected values
- **selectors.ts**: Centralized element selectors

## 📊 Reporting & Metrics

### Allure Reports
- Comprehensive test reporting with trends and history
- Test categorization by Epic/Feature/Story
- Severity levels and test metadata
- Screenshots and attachments for failures

### Test Dashboard
- Real-time test metrics and pass rates
- Coverage visualization by test type
- Performance metrics tracking
- Accessible at `/test-dashboard/`

### Playwright HTML Reports
- Detailed test execution results
- Browser-specific test outcomes
- Trace viewer for debugging failures

## 🚀 Running Tests

### Individual Test Types
```bash
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # End-to-end tests only
npm run test:performance  # Performance tests only
npm run test:accessibility # Accessibility tests only
npm run test:api          # API tests only
```

### Comprehensive Testing
```bash
npm run test:all          # All tests with cleanup
npm run test:report       # All tests + generate reports
```

### Report Generation
```bash
npm run allure:generate   # Generate Allure report
npm run allure:serve      # Serve Allure report locally
npm run allure:open       # Open generated Allure report
```

## 📈 Quality Gates

### Test Coverage Requirements
- **Unit Tests**: >90% code coverage
- **Integration Tests**: >80% integration coverage
- **E2E Tests**: 100% critical path coverage
- **Performance Tests**: All pages meet Core Web Vitals
- **Accessibility Tests**: 100% WCAG 2.1 AA compliance

### CI/CD Integration
- All tests run on pull requests
- Performance budgets enforced
- Accessibility checks mandatory
- Visual regression detection
- Allure reports published to GitHub Pages

## 🔧 Configuration

### Playwright Configuration
- Multi-browser testing (Chrome, Firefox, Safari)
- Mobile and desktop viewports
- Parallel execution enabled
- Retry logic for flaky tests
- Screenshot and video capture on failures

### Test Data Management
- Centralized test constants
- Environment-specific configurations
- Mock data for consistent testing
- Fixture management for complex scenarios

## 📝 Test Naming Conventions

### File Naming
- `*.spec.ts` for all test files
- Descriptive names indicating scope: `homepage-layout.spec.ts`
- Component-specific: `navigation-icons.spec.ts`

### Test Descriptions
- Clear, human-readable descriptions
- Follows pattern: "should [expected behavior] when [condition]"
- Grouped by functionality using `describe` blocks

### Allure Annotations
- `@allure.epic()`: High-level feature area
- `@allure.feature()`: Specific functionality
- `@allure.story()`: User story or scenario
- `@allure.severity()`: Test importance level

## 🐛 Debugging & Troubleshooting

### Common Commands
```bash
# Run tests in headed mode for debugging
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/homepage/homepage-layout.spec.ts

# Generate and view trace
npx playwright test --trace on
npx playwright show-trace trace.zip

# Update visual baselines
npx playwright test --update-snapshots
```

### Best Practices
- Use page objects for maintainable tests
- Implement proper wait strategies
- Isolate tests from each other
- Use meaningful assertions
- Document complex test scenarios
- Regular test maintenance and cleanup
