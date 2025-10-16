# Project Setup Guide

## Initial Setup Complete ✅

Your project is now configured with:
- ✅ ESLint for code quality
- ✅ Prettier for code formatting
- ✅ Husky for Git hooks
- ✅ Commitlint for conventional commits
- ✅ GitHub Actions CI/CD pipeline
- ✅ Branch protection ready
- ✅ All tests passing

## Next Steps

### 1. Connect to GitHub

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
git push origin develop
```

### 2. Set Up Branch Protection

Go to your GitHub repository settings:

**Settings → Branches → Add rule**

For branch `main`:
- ✅ Require a pull request before merging
- ✅ Require approvals: 1
- ✅ Require status checks to pass before merging
  - Select: `Lint & Format Check`
  - Select: `Run Tests`
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings

### 3. Development Workflow

```bash
# Always work on develop or feature branches
git checkout develop

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes, commit with conventional commits
git add .
git commit -m "feat: add new feature"

# Push and create PR to develop
git push -u origin feature/your-feature-name
```

### 4. Merging to Main

1. Create PR from `develop` to `main`
2. Wait for CI/CD checks to pass
3. Get approval from team member
4. Merge PR
5. GitHub Actions will automatically deploy

## Available Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Testing
```bash
npm test                 # Run all tests (unit + E2E)
npm run test:unit        # Run unit tests only
npm run test:e2e         # Run E2E tests
npm run test:e2e:report  # Run E2E tests with HTML report
```

### Code Quality
```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors automatically
npm run format           # Format all files with Prettier
npm run format:check     # Check if files are formatted
```

### Other
```bash
npm run health-check     # Start health monitoring API
```

## Git Hooks

### Pre-commit Hook
Automatically runs before each commit:
- Runs ESLint on staged files
- Formats staged files with Prettier
- Fixes issues automatically when possible

### Commit-msg Hook
Validates commit messages follow conventional commit format:
```
<type>(<scope>): <subject>

Examples:
feat(auth): add login functionality
fix(api): resolve null pointer exception
docs(readme): update setup instructions
```

## CI/CD Pipeline

The GitHub Actions workflow runs on:
- Every push to `main`
- Every pull request to `main`

Pipeline steps:
1. **Lint & Format Check** - Ensures code quality
2. **Run Tests** - Runs unit and E2E tests
3. **Deploy** - Deploys to production (only on main)

## Troubleshooting

### Commit rejected due to message format
```bash
# Use conventional commit format:
git commit -m "feat: your feature description"
# or
git commit -m "fix: bug description"
```

### Pre-commit hook fails
```bash
# Fix linting issues:
npm run lint:fix

# Format code:
npm run format

# Then commit again
git add .
git commit -m "fix: resolve linting issues"
```

### Tests fail
```bash
# Run tests locally to see errors:
npm test

# Fix issues, then commit
```

## Project Structure

```
nekmit/
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── .husky/
│   ├── pre-commit           # Pre-commit hook
│   └── commit-msg           # Commit message validation
├── src/
│   ├── api/                 # API endpoints
│   ├── components/          # Web components
│   ├── utils/               # Utility functions
│   └── *.html               # HTML pages
├── tests/                   # E2E tests
├── public/                  # Static assets
├── .prettierrc              # Prettier config
├── eslint.config.js         # ESLint config
├── commitlint.config.js     # Commitlint config
├── package.json             # Dependencies and scripts
└── CONTRIBUTING.md          # Contribution guidelines
```

## Support

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
- Check [README.md](./README.md) for project overview
- Review test files in `tests/` for examples
