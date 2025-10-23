# 🚀 Nekmit Portfolio

[![CI/CD Pipeline](https://github.com/k1rta/nekmit/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/k1rta/nekmit/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)
[![Playwright Tests](https://img.shields.io/badge/tests-240%20passing-success)](https://github.com/k1rta/nekmit/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

> Modern TypeScript portfolio with automated testing and CI/CD pipeline

## ✨ Features

- 🧪 **Live Test Reports** - Interactive Playwright test results with 240 tests
- 🔄 **CI/CD Pipeline** - Automated testing and deployment
- ⚡ **Modern Stack** - TypeScript + Vite + Tailwind CSS + Web Components
- 🎨 **Code Quality** - ESLint + Prettier + Husky hooks
- 🔷 **TypeScript** - Full type safety with strict mode enabled
- 📝 **Conventional Commits** - Enforced commit standards
- 🔒 **Branch Protection** - Protected main branch with required checks
- ♿ **Accessibility** - WCAG compliant with ARIA labels and tooltips
- 🎯 **100% Test Coverage** - All interactive elements have data-testids
- 🏅 **Quality Badges** - 5 visual badges showcasing key features

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Available Commands](#-available-commands)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Development Workflow](#-development-workflow)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/k1rta/nekmit.git
cd nekmit

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Development

```bash
# Start development server
npm run dev
# Visit http://localhost:3000

# Run tests
npm test

# Generate test reports
npm run test:e2e:report
# View at http://localhost:3000/test-reports/index.html
```

---

## 📦 Available Commands

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Testing

| Command | Description |
|---------|-------------|
| `npm test` | Run all E2E tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:e2e:report` | Run E2E tests + generate HTML report |

### Code Quality

| Command | Description |
|---------|-------------|
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Auto-fix linting errors |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check code formatting |

---

## 📁 Project Structure

```text
nekmit/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline configuration
├── .husky/                     # Git hooks
│   ├── pre-commit              # Runs lint & format before commit
│   └── commit-msg              # Validates commit message format
├── public/
│   ├── resume.pdf              # Resume file
│   └── test-reports/           # Generated test reports (after running tests)
├── src/
│   ├── index.html              # Main portfolio page
│   ├── main.ts                 # Entry point (TypeScript)
│   ├── style.css               # Tailwind styles
│   ├── components/
│   │   ├── header.ts           # Header web component (TypeScript)
│   │   ├── footer.ts           # Footer web component (TypeScript)
│   │   └── icon-card.ts        # Icon card component (TypeScript)
│   └── utils/
│       └── tooltip.ts          # Tooltip utilities (TypeScript)
├── tests/
│   ├── homepage-core.spec.ts           # Core page elements (TypeScript)
│   ├── homepage-navigation.spec.ts     # Navigation icons & links (TypeScript)
│   ├── homepage-accessibility.spec.ts  # Accessibility compliance (TypeScript)
│   ├── homepage-interactions.spec.ts   # User interactions (TypeScript)
│   ├── homepage-responsive.spec.ts     # Responsive design (TypeScript)
│   ├── homepage-badges.spec.ts         # Badge functionality (TypeScript)
│   ├── homepage-tooltips.spec.ts       # Tooltip behavior (TypeScript)
│   ├── homepage-layout.spec.ts         # Visual & layout tests (TypeScript)
│   ├── homepage-icons.spec.ts          # Icon functionality (TypeScript)
│   ├── landscape-mode.spec.ts          # Landscape mode restriction (TypeScript)
│   ├── tagline.spec.ts                 # Tagline responsive tests (TypeScript)
│   └── selectors.ts                    # Centralized test data (TypeScript)
├── tsconfig.json               # TypeScript configuration
├── TYPESCRIPT_MIGRATION.md     # TypeScript migration documentation
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE.txt                 # MIT License
└── package.json                # Dependencies and scripts
```

---

## 🧪 Testing

### Test Suite Overview

**Total: 240 tests** across 12 test files, running on 3 browsers (Chromium, Firefox, WebKit)

**TypeScript Coverage:** 100% - All source code and tests written in TypeScript

#### Test Files

| Test File | Tests | Description |
|-----------|-------|-------------|
| **homepage-core** | ~12 | Page title, heading, tagline, badges |
| **homepage-navigation** | ~15 | All 5 icons, correct links, external link security |
| **homepage-accessibility** | ~12 | ARIA labels, tooltips, semantic HTML |
| **homepage-interactions** | ~9 | Animations, hover effects, badge visibility |
| **homepage-responsive** | ~12 | Mobile, tablet, desktop layouts |
| **homepage-badges** | ~21 | All 5 badges, icons, text, hover effects |
| **homepage-tooltips** | ~24 | Tooltip functionality, library-agnostic |
| **homepage-layout** | ~40 | Visual behavior, computed styles, positioning |
| **homepage-icons** | ~35 | Icon functionality, keyboard accessibility |
| **landscape-mode** | ~17 | Landscape mode restriction for mobile/tablet |
| **tagline** | ~26 | Tagline responsive typography and layout |

### Running Tests

```bash
# Run all tests
npm run test:e2e

# Run specific category
npx playwright test homepage-core
npx playwright test homepage-navigation
npx playwright test homepage-accessibility

# Run with UI mode (interactive)
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
```

### Test Reports

1. Generate report: `npm run test:e2e:report`
2. Reports saved to: `playwright-report/`
3. View in browser: `open playwright-report/index.html`
4. Includes: Screenshots, traces, detailed results

**CI/CD:** Test reports are automatically uploaded as artifacts on every PR and available for download from GitHub Actions.

### Centralized Test Selectors

All test data is centralized in `tests/selectors.ts` for easy maintenance:

```typescript
// tests/selectors.ts
export const dataTestIds = {
  mainHeading: '[data-testid="main-heading"]',
  iconResume: '[data-testid="icon-resume"]',
  badgeQuality: '[data-testid="badge-quality"]',
  // ... 30+ more selectors
} as const;

export const links = {
  resume: '/resume',
  projects: 'https://github.com/k1rta?tab=repositories',
  quality: '/test-reports/index.html',
  // ... more links
} as const;

export const tooltips = {
  resume: 'View resume & skills',
  projects: 'View GitHub projects',
  // ... more tooltips
} as const;

export interface ViewportSize {
  width: number;
  height: number;
}

export const viewports: Record<'mobile' | 'tablet' | 'desktop', ViewportSize> = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
} as const;
```

**Benefits:**

- ✅ Single source of truth
- ✅ Update once, applies everywhere
- ✅ No hardcoded strings in tests
- ✅ Easy refactoring
- ✅ **Type-safe** with TypeScript const assertions
- ✅ IDE autocomplete for all selectors

---

## 🚀 CI/CD Pipeline

### Automated Checks

Every PR and push to `main`/`develop` triggers:

- ✅ **ESLint** - Code quality validation
- ✅ **Prettier** - Code formatting check
- ✅ **Build** - Application build verification
- ✅ **E2E Tests** - 240 tests across 3 browsers

### Branch Protection

Tests **must pass** before merging:

1. Linting passes ✅
2. Formatting correct ✅
3. Build succeeds ✅
4. All tests pass ✅

### Features

- 📊 Test reports uploaded as artifacts
- 💬 Automatic PR comments with results
- ⚡ Playwright browser caching (~60% faster)
- 🔒 Merge blocking on failures

### Local Testing

```bash
# Run all CI checks locally
npm run lint
npm run format:check
npm run build
npm run test:e2e:report
```

---

## 🔄 Development Workflow

### Branch Strategy

- **`main`** - Protected production branch
- **`develop`** - Development branch
- **`feature/*`** - Feature branches
- **`fix/*`** - Bug fix branches
- **`test/*`** - Test branches
- **`chore/*`** - Maintenance branches
- **`ci/*`** - CI/CD changes

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes
# ... edit files ...

# 3. Commit (hooks will auto-lint and validate message)
git add .
git commit -m "feat: add new feature"

# 4. Push branch
git push -u origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# 6. Wait for CI checks to pass
# 7. Get approval and merge
```

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <subject>

Types:
- feat:     New feature
- fix:      Bug fix
- docs:     Documentation changes
- style:    Code style changes (formatting)
- refactor: Code refactoring
- test:     Adding or updating tests
- chore:    Maintenance tasks
- ci:       CI/CD changes

Examples:
feat(auth): add user login functionality
fix(api): resolve null pointer in health endpoint
docs(readme): update installation instructions
test(e2e): add accessibility tests
```

### Git Hooks

**Pre-commit** (runs automatically before each commit):

- ✅ Runs ESLint and auto-fixes issues
- ✅ Formats code with Prettier
- ✅ Stages fixed files

**Commit-msg** (validates commit message):

- ✅ Ensures conventional commit format
- ✅ Rejects invalid messages

---

## 🔒 Branch Protection

The `main` branch is protected with these rules:

| Rule | Status |
|------|--------|
| Require pull request | ✅ Enabled |
| Require status checks | ✅ Enabled |
| - Lint & Format Check | ✅ Required |
| - Run Tests | ✅ Required |
| Require up-to-date branch | ✅ Enabled |
| Do not allow bypassing | ✅ Enabled |
| No direct pushes | ✅ Enforced |

### How to Set Up Branch Protection

1. Go to: **Settings → Branches → Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
     - Select: `Lint & Format Check`
     - Select: `Run Tests`
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings**
4. Click **Save changes**

**Result:** No broken code reaches production! 🎯

---

## 🌐 Deployment

### Vercel (Recommended)

**Live Site**: [https://nekmit.vercel.app](https://nekmit.vercel.app)

#### Automatic Deployment

Vercel automatically deploys when:

- ✅ Pull request is merged to `main`
- ✅ All tests pass in CI/CD
- ✅ Linting passes
- ✅ Build succeeds

#### Setup Vercel Deployment

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Alternative: GitHub Pages

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

### Alternative: Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Auto-deploys on push to main

---

## 🎨 Customization

### Update Personal Info

**Name and title:**

```html
<!-- src/index.html -->
<h1 data-testid="main-heading">Your Name</h1>
<p data-testid="tagline">Your Title</p>
```

**Links:**

```javascript
// tests/selectors.js
export const links = {
  github: 'https://github.com/YOUR_USERNAME/YOUR_REPO',
  email: 'mailto:your.email@example.com',
  // ... update other links
};
```

### Customize Colors

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Change primary color
      },
    },
  },
} satisfies Config;
```

---

## 🔗 Functional Icons

The portfolio includes 5 interactive icons with tooltips:

| Icon | Links To | Tooltip | Description |
|------|----------|---------|-------------|
| 📄 Resume | `/resume` | View resume & skills | Resume and skills page |
| 💻 Projects | GitHub repositories | View GitHub projects | Portfolio projects on GitHub |
| 📊 Quality | `/test-reports/` | View test reports | Live Playwright test results |
| 💼 Business | Estonian Registry | View company details | Nekmit OÜ company info |
| 📧 Contact | `mailto:` | Send email | Contact via email |

## 🏅 Quality Badges

Footer displays 5 badges showcasing key features:

| Badge | Icon | Description |
|-------|------|-------------|
| 🚀 Automated Deployment | Rocket | CI/CD pipeline automation |
| 🧪 Quality Assured | Vial | Comprehensive test coverage |
| 💜 User-Centered Design | Heart | Focus on UX and accessibility |
| ⚡ Lightning Fast | Zap | Optimized performance |
| 🌍 Globally Accessible | Globe | WCAG compliant accessibility |

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Development workflow
- Code quality standards
- Pull request process
- Commit message guidelines

### Quick Contribution Steps

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and commit: `git commit -m "feat: add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request
6. Wait for CI checks to pass
7. Get review and merge

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE.txt](LICENSE.txt) for details.

---

## 🙏 Acknowledgments

- **TypeScript** - Type-safe JavaScript at scale
- **Vite** - Lightning fast build tool with native TypeScript support
- **Tailwind CSS** - Utility-first CSS framework
- **Playwright** - Reliable end-to-end testing with TypeScript support
- **ESLint & Prettier** - Code quality tools
- **Husky** - Git hooks made easy

---

## 📞 Contact

- **GitHub**: [@k1rta](https://github.com/k1rta)
- **Email**: <kirtalindakarits@icloud.com>
- **Company**: [Nekmit OÜ](https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C)

---

## 🛠️ Built With

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io/)
