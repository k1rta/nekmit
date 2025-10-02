# Testing Strategy

This project uses a comprehensive testing strategy with different test types for different scenarios.

## Test Categories

### 🚀 Smoke Tests (`tests/smoke/`)

- **Purpose**: Critical functionality validation
- **When**: Run on every push
- **Speed**: Fast (< 30 seconds)
- **Coverage**: Core functionality, basic accessibility
- **Command**: `npm run test:smoke`

### 🔄 End-to-End Tests (`tests/e2e/`)

- **Purpose**: Complete user journeys and workflows
- **When**: Run on PR creation and main branch
- **Speed**: Medium (1-3 minutes)
- **Coverage**: User flows, responsive design, cross-browser
- **Command**: `npm run test:e2e` (included in full suite)

### 🔗 Integration Tests (`tests/integration/`)

- **Purpose**: API integration and external service testing
- **When**: Run on PR creation and main branch
- **Speed**: Slower (2-5 minutes due to API calls)
- **Coverage**: API endpoints, external integrations, error handling
- **Command**: `npm run test:full`

## Test Execution Strategy

### On Push (Any Branch)

```bash
npm run test:smoke
```

- Only smoke tests run for fast feedback
- Validates core functionality isn't broken

### On Pull Request

```bash
npm run test:full        # Full test suite against local build
```

- Complete test coverage
- Tests against local build environment
- Generates comprehensive reports

### Local Development

```bash
npm test                 # Runs smoke tests (default)
npm run test:smoke       # Quick validation
npm run test:e2e         # Full local testing
npm run test:full        # Complete test suite
```

## Test Reports

### Report Structure

- **Commit-specific**: `https://k1rta.github.io/nekmit/reports/{branch}/{commit}/`
- **Latest for branch**: `https://k1rta.github.io/nekmit/reports/{branch}/latest/`
- **Main branch**: `https://k1rta.github.io/nekmit/reports/main/latest/`

### Report Types

- **HTML Reports**: Interactive Playwright reports with screenshots and traces
- **JSON Reports**: Machine-readable test results
- **Artifacts**: Test videos and screenshots for failed tests

## Configuration Files

- `playwright.config.ts` - Main configuration (full test suite)
- `playwright.smoke.config.ts` - Smoke tests only
- `playwright.vercel.config.ts` - Testing against Vercel deployments

## Environment Variables

- `PLAYWRIGHT_BASE_URL` - Override base URL for testing (used for Vercel preview testing)

## Best Practices

1. **Test Naming**: Use descriptive test names that explain what's being tested
2. **Test Organization**: Group related tests in describe blocks
3. **Selectors**: Use data-testid attributes for stable selectors (see `selectors/index.ts`)
4. **Timeouts**: Different timeouts for different test types (smoke: 15s, e2e: 30s, integration: 45s)
5. **Screenshots**: Automatic screenshots on failure for debugging
6. **Traces**: Available for failed tests to debug issues

## Adding New Tests

1. **Smoke Tests**: Add to `tests/smoke/` for critical functionality
2. **E2E Tests**: Add to `tests/e2e/` for user workflows
3. **Integration Tests**: Add to `tests/integration/` for API/external service testing

Remember to update selectors in `selectors/index.ts` when adding new UI elements to test.
