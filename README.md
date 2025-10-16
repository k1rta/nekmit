# 🚀 Nekmit Portfolio

[![CI/CD Pipeline](https://github.com/k1rta/nekmit/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/k1rta/nekmit/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)
[![Playwright Tests](https://img.shields.io/badge/tests-66%20passing-success)](https://github.com/k1rta/nekmit/actions)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

> Modern portfolio with automated testing, health monitoring, and CI/CD pipeline

## ✨ Features

- 🧪 **Live Test Reports** - Interactive Playwright test results with 81+ tests
- 💚 **Health Monitoring** - Real-time system health API endpoint
- 🔄 **CI/CD Pipeline** - Automated testing and deployment
- ⚡ **Modern Stack** - Vite + Tailwind CSS + Web Components
- 🎨 **Code Quality** - ESLint + Prettier + Husky hooks
- 📝 **Conventional Commits** - Enforced commit standards
- 🔒 **Branch Protection** - Protected main branch with required checks
- ♿ **Accessibility** - WCAG compliant with ARIA labels

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Available Commands](#-available-commands)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Health API](#-health-api)
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

### Other

| Command | Description |
|---------|-------------|
| `npm run health-check` | Start health monitoring API on port 3001 (local only) |

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
│   ├── main.js                 # Entry point
│   ├── style.css               # Tailwind styles
│   ├── api/
│   │   └── health.js           # Health monitoring API
│   ├── components/
│   │   ├── header.js           # Header web component
│   │   └── footer.js           # Footer web component
│   └── utils/                  # Utility functions
├── tests/
│   ├── homepage-core.spec.js           # Core page elements (4 tests)
│   ├── homepage-navigation.spec.js     # Navigation icons (8 tests)
│   ├── homepage-interactions.spec.js   # User interactions (3 tests)
│   ├── homepage-responsive.spec.js     # Responsive design (4 tests)
│   ├── homepage-accessibility.spec.js  # Accessibility (4 tests)
│   └── selectors.js                    # Centralized test selectors
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE.txt                 # MIT License
└── package.json                # Dependencies and scripts
```

---

## 🧪 Testing

### Test Suite Overview

**Total: 66 tests** across 5 categories, running on 3 browsers (Chromium, Firefox, WebKit)

#### Test Categories

| Category | Tests | Description |
|----------|-------|-------------|
| **Core Elements** | 4 | Page title, heading, tagline, footer |
| **Navigation** | 8 | All 6 icons, links, functionality |
| **Interactions** | 3 | Animations, hover states, clicks |
| **Responsive** | 4 | Mobile, tablet, desktop layouts |
| **Accessibility** | 4 | ARIA labels, semantic HTML, WCAG |

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
2. Reports saved to: `public/test-reports/`
3. View in browser: <http://localhost:3000/test-reports/index.html>
4. Includes: Screenshots, traces, detailed results

### Centralized Test Selectors

All test data is centralized in `tests/selectors.js` for easy maintenance:

```javascript
// tests/selectors.js
export const testIds = {
  mainHeading: 'main-heading',
  iconGithub: 'icon-github',
  // ... more selectors
};

export const links = {
  github: 'https://github.com/k1rta/nekmit',
  resume: '/resume.pdf',
  // ... more links
};
```

**Benefits:**

- ✅ Single source of truth
- ✅ Update once, applies everywhere
- ✅ No hardcoded strings in tests
- ✅ Easy refactoring

---

## 💚 Health API

The Health API is a Vercel serverless function that provides real-time system health information.

### API Endpoint

**URL:** `/api/health`  
**Method:** `GET`  
**Content-Type:** `application/json`

### Live Documentation

Visit the interactive API documentation page: [https://nekmit.vercel.app/api-docs.html](https://nekmit.vercel.app/api-docs.html)

The API docs page includes:

- 📊 Live API status with real-time data
- 📝 Complete parameter documentation
- 🧪 Interactive "Try It Out" feature
- 💻 Code examples (JavaScript, cURL)
- 🎨 Beautiful UI with reusable card components

### Response Structure

```json
{
  "status": "healthy",
  "timestamp": "2025-10-16T13:00:00.000Z",
  "uptime": 123.45,
  "memory": {
    "used": 45,
    "total": 128,
    "unit": "MB"
  },
  "environment": {
    "nodeVersion": "v20.0.0",
    "platform": "linux",
    "arch": "x64"
  },
  "api": {
    "version": "1.0.0",
    "endpoints": [
      {
        "path": "/api/health",
        "method": "GET",
        "description": "Get system health status"
      }
    ]
  }
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Current health status ("healthy") |
| `timestamp` | string | ISO 8601 timestamp |
| `uptime` | number | Server uptime in seconds |
| `memory.used` | number | Memory used in MB |
| `memory.total` | number | Total memory in MB |
| `memory.unit` | string | Memory unit ("MB") |
| `environment.nodeVersion` | string | Node.js version |
| `environment.platform` | string | Operating system platform |
| `environment.arch` | string | CPU architecture |
| `api.version` | string | API version |
| `api.endpoints` | array | Available API endpoints |

### Usage Examples

**JavaScript (Fetch API):**

```javascript
fetch('/api/health')
  .then((res) => res.json())
  .then((data) => {
    console.log('Status:', data.status);
    console.log('Uptime:', data.uptime);
    console.log('Memory:', data.memory);
  })
  .catch((err) => console.error(err));
```

**cURL:**

```bash
curl -X GET https://nekmit.vercel.app/api/health \
  -H "Accept: application/json"
```

### API Tests

The API has comprehensive test coverage with **15 tests**:

- ✅ Status code validation
- ✅ Content-type verification
- ✅ Response structure validation
- ✅ Data type checking
- ✅ CORS support
- ✅ HTTP method restrictions
- ✅ Error handling

Run API tests separately:

```bash
npx playwright test --grep "API -"
```

### Features

- 🚀 **Serverless** - Runs on Vercel's edge network
- 🌍 **CORS Enabled** - Accessible from any origin
- 🔒 **Method Restricted** - Only GET requests allowed
- ⚡ **Fast** - Sub-100ms response time
- 📊 **Real-time** - Live system metrics
- 🧪 **Tested** - 100% test coverage

---

## 🔄 Development Workflow

### Branch Strategy

- **`main`** - Protected production branch
- **`develop`** - Development branch
- **`feature/*`** - Feature branches
- **`fix/*`** - Bug fix branches
- **`chore/*`** - Maintenance branches

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

**Note**: The Health API is now a Vercel serverless function and works in production! Visit `/api-docs.html` for interactive documentation.

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

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Change primary color
      },
    },
  },
};
```

---

## 🔗 Functional Icons

The portfolio includes 6 interactive icons:

| Icon | Color | Links To | Description |
|------|-------|----------|-------------|
| 📄 Resume | Blue | `/resume.pdf` | Download resume |
| 🐙 GitHub | Gray | GitHub profile | View source code |
| 🧪 Test Reports | Blue | `/test-reports/` | Live test results |
| 💚 API Docs | Green | `/api-docs.html` | Health API documentation |
| 📧 Email | Red | `mailto:` | Contact email |
| 🏢 Company | Purple | Registry | Company info |

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

- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Playwright** - Reliable end-to-end testing
- **ESLint & Prettier** - Code quality tools
- **Husky** - Git hooks made easy

---

## 📞 Contact

- **GitHub**: [@k1rta](https://github.com/k1rta)
- **Email**: <kirtalindakarits@icloud.com>
- **Company**: [Nekmit OÜ](https://ariregister.rik.ee/eng/company/14401168/Nekmit-O%C3%9C)

---

## 🛠️ Built With

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io/)
