# Contributing Guide

## Development Workflow

### 1. Branch Strategy
- `main` - Protected branch, requires PR and passing tests
- `develop` - Development branch for ongoing work
- Feature branches: `feature/your-feature-name`
- Bug fixes: `fix/bug-description`

### 2. Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages.

#### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or dependency changes
- **ci**: CI/CD configuration changes
- **chore**: Other changes that don't modify src or test files

#### Examples
```bash
feat(auth): add user login functionality

fix(api): resolve null pointer exception in health endpoint

docs(readme): update installation instructions

test(e2e): add accessibility tests for homepage
```

### 3. Before Committing

The pre-commit hook will automatically:
- Run ESLint and fix issues
- Format code with Prettier
- Validate commit message format

### 4. Pull Request Process

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass: `npm test`
4. Ensure linting passes: `npm run lint`
5. Push your branch and create a PR to `develop`
6. Wait for CI/CD checks to pass
7. Request review from team members
8. Merge only after approval and passing tests

### 5. Code Quality Standards

#### Linting
```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

#### Formatting
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

#### Testing
```bash
npm test              # Run all tests
npm run test:unit     # Run unit tests only
npm run test:e2e      # Run E2E tests only
```

### 6. Branch Protection Rules

The `main` branch is protected with the following rules:
- Require pull request reviews before merging
- Require status checks to pass before merging
  - Lint & Format Check
  - Run Tests
- Require branches to be up to date before merging
- No direct pushes to main

### 7. Getting Help

If you have questions or need help:
- Check existing issues and PRs
- Review the README.md
- Ask in team chat or create a discussion

## Quick Reference

### Setup
```bash
npm install
npx playwright install
```

### Development
```bash
npm run dev          # Start dev server
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm test             # Run all tests
```

### Commit
```bash
git add .
git commit -m "feat: add new feature"  # Commit message will be validated
git push
```
