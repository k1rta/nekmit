# CI/CD Pipeline Guide

## Overview

This project uses GitHub Actions for continuous integration and deployment. The pipeline ensures code quality, runs comprehensive tests, and blocks merging of failing code.

## Pipeline Features

### ✅ Automated Checks

1. **Linting & Formatting**
   - ESLint validation
   - Prettier code formatting check
   - Runs on every PR and push

2. **E2E Testing**
   - 240 Playwright tests across 3 browsers
   - Automatic test report generation
   - Test result artifacts uploaded for 30 days

3. **PR Merge Blocking**
   - **Tests must pass to merge** - Failed tests block PR merging
   - Status checks required before merge
   - Branch protection enforced

### 🚀 Workflow Triggers

The CI/CD pipeline runs on:

- **Pull Requests** to `main` or `develop` branches
- **Pushes** to `main` or `develop` branches
- **Manual trigger** via GitHub Actions UI (`workflow_dispatch`)

### 📊 Test Reporting

#### Artifacts Generated

1. **Playwright HTML Report** (`playwright-report/`)
   - Interactive test results
   - Screenshots on failure
   - Trace files for debugging
   - Retention: 30 days

2. **Test Results JSON** (`test-results/`)
   - Machine-readable test results
   - JUnit XML for CI integration
   - Retention: 30 days

#### Accessing Test Reports

**From GitHub Actions:**
1. Go to Actions tab
2. Click on the workflow run
3. Scroll to "Artifacts" section
4. Download `playwright-html-report` or `test-results-json`

**Locally:**
```bash
# Run tests and generate report
npm run test:e2e:report

# View report
open playwright-report/index.html
```

### 🔒 Branch Protection Setup

To enable test failure blocking on PRs:

1. **Go to Repository Settings**
   - Settings → Branches → Add rule

2. **Configure Branch Protection for `main`:**
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
     - Select: `Lint & Format Check`
     - Select: `Run Tests`
     - Select: `All Checks Passed`
   - ✅ Require branches to be up to date before merging
   - ✅ Do not allow bypassing the above settings

3. **Save Changes**

**Result:** PRs with failing tests cannot be merged! 🎯

### 🧪 Testing the Workflow

#### Method 1: Create a Test PR with Failing Tests

```bash
# Create a test branch
git checkout -b test/failing-tests

# Modify a test to fail
# Edit tests/homepage-core.spec.ts and change an assertion

# Commit and push
git add .
git commit -m "test: intentionally failing test"
git push -u origin test/failing-tests

# Create PR on GitHub
# Observe: CI fails, PR cannot be merged
```

#### Method 2: Manual Workflow Trigger

1. Go to **Actions** tab on GitHub
2. Select **CI/CD Pipeline** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

#### Method 3: Local Testing Before Push

```bash
# Run all checks locally
npm run lint
npm run format:check
npm run test:e2e:report

# If all pass, you're good to push!
```

### 📝 PR Comments

The workflow automatically comments on PRs with test results:

```markdown
## ✅ Test Results: PASSED

**Status:** success
**Workflow:** [View Details](link-to-workflow)
**Artifacts:** Test reports are available in the workflow artifacts

---
*Automated comment by CI/CD Pipeline*
```

### 🔧 Advanced DevOps Features

#### Parallel Job Execution

Jobs run in parallel where possible:
- `lint` runs independently
- `test` runs after `lint` succeeds
- `status-check` runs after both complete

#### Failure Handling

- **continue-on-error: false** - Tests must pass
- **fail-on-error: true** - Test reporter blocks merge
- **if: always()** - Artifacts uploaded even on failure

#### Caching

- **npm cache** - Speeds up dependency installation
- **Playwright browsers** - Cached between runs

### 📈 Monitoring & Debugging

#### View Test Results

```bash
# After running tests locally
open playwright-report/index.html
```

#### Debug Failed Tests

```bash
# Run in debug mode
npx playwright test --debug

# Run specific test
npx playwright test homepage-core.spec.ts --debug

# Run with UI mode
npx playwright test --ui
```

#### CI Debugging

1. Check workflow logs in GitHub Actions
2. Download artifacts for detailed reports
3. Review PR comments for quick status
4. Check `status-check` job for overall status

### 🎯 Best Practices

1. **Always run tests locally before pushing**
   ```bash
   npm test
   ```

2. **Fix linting issues before committing**
   ```bash
   npm run lint:fix
   ```

3. **Keep tests up to date**
   - Add tests for new features
   - Update tests when changing functionality

4. **Review test reports**
   - Check artifacts on failed runs
   - Investigate flaky tests
   - Keep test suite healthy

### 🚨 Common Issues

#### Issue: Tests pass locally but fail in CI

**Solution:**
- Check for environment-specific issues
- Ensure all dependencies are in `package.json`
- Review CI logs for specific errors

#### Issue: Artifacts not uploading

**Solution:**
- Verify paths in workflow match Playwright config
- Check that directories exist after test run
- Review `playwright.config.ts` output folders

#### Issue: PR merge button disabled

**Solution:**
- Ensure all required status checks pass
- Update branch with latest `main`
- Check branch protection rules are configured

### 📚 Related Documentation

- [README.md](./README.md) - Project overview and setup
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [Playwright Documentation](https://playwright.dev/) - Testing framework docs
- [GitHub Actions Documentation](https://docs.github.com/en/actions) - CI/CD platform docs

### 🔄 Workflow Diagram

```
┌─────────────────┐
│   Push/PR       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Lint & Format  │
│     Check       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Run Tests     │
│  (240 tests)    │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐ ┌─────────────────┐
│ Upload Reports  │ │  Comment on PR  │
└─────────────────┘ └─────────────────┘
         │
         ▼
┌─────────────────┐
│  Status Check   │
│  (Pass/Fail)    │
└────────┬────────┘
         │
         ▼
   ┌─────────┐
   │ Success │ → ✅ Merge allowed
   └─────────┘
   ┌─────────┐
   │ Failure │ → ❌ Merge blocked
   └─────────┘
```

### 💡 Tips

- **Use `workflow_dispatch`** to test workflow changes without pushing
- **Check artifacts** for detailed test reports on failures
- **Enable branch protection** to enforce quality standards
- **Monitor workflow runs** to catch issues early
- **Keep dependencies updated** for security and performance

---

**Questions?** Check the [CONTRIBUTING.md](./CONTRIBUTING.md) or open an issue!
