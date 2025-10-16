# Modern Portfolio with Live Test Reports & Health Monitoring

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions)

## 🎯 Features

- **Live Test Reports**: Click the icon to view Playwright test results
- **Health Monitoring API**: Real-time system health endpoint
- **CI/CD Pipeline**: Automated testing on every PR with branch protection
- **Modern Stack**: Vite + Tailwind + Web Components
- **Code Quality**: ESLint + Prettier + Husky pre-commit hooks
- **Conventional Commits**: Enforced commit message standards

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 2: Start Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

### Step 3: Run Tests (generates reports)
```bash
npm run test:e2e:report
```
Test reports will be available at: http://localhost:3000/test-reports/index.html

### Step 4: Start Health API (optional)
```bash
npm run health-check
```
API available at: http://localhost:3001/api/health

## 📋 Available Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

### Testing
```bash
npm test                 # Run all tests (unit + E2E)
npm run test:unit        # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:e2e:report  # Run tests + generate HTML report
```

### Code Quality
```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

### Other
```bash
npm run health-check     # Start health monitoring API
```

## 🔗 Functional Icons

### 1. Test Reports Icon (Blue)
- **Links to**: `/test-reports/index.html`
- **Shows**: Live Playwright test results
- **Updates**: Every time you run `npm run test:e2e:report`

### 2. Health Monitor Icon (Green)
- **Links to**: `/api/health`
- **Shows**: System uptime, memory usage, last test run
- **Updates**: Real-time

### 3. CI/CD Pipeline Icon (Purple)
- **Links to**: GitHub Actions page
- **Shows**: Build status, deployment history
- **Updates**: On every push/PR

## 📁 Project Structure

```
src/
├── index.html           # Main page with functional icons
├── testing.html         # Testing skills page
├── frontend.html        # Frontend skills page
├── devops.html          # DevOps skills page
├── components/          # Web Components
│   ├── header.js
│   └── footer.js
├── api/
│   └── health.js        # Health monitoring API
└── style.css            # Tailwind styles

tests/
└── homepage.spec.js     # Playwright tests

public/
└── test-reports/        # Generated test reports (after running tests)
```

## 🧪 How It Works

### Test Reports
1. Run `npm run test:e2e:report`
2. Playwright generates HTML report in `public/test-reports/`
3. Click "Test Reports" icon on homepage to view
4. Shows: Pass/fail status, screenshots, traces

### Health API
1. Start with `npm run health-check`
2. Returns JSON with:
   - System status
   - Memory usage
   - Uptime
   - Last test run info

### CI/CD
1. Push code to GitHub
2. GitHub Actions runs automatically
3. Runs tests
4. Generates reports
5. Deploys if tests pass

## 🌐 Deployment

### GitHub Pages
1. Enable GitHub Pages in repo settings
2. Source: `gh-pages` branch
3. CI/CD auto-deploys on push to main

### Cloudflare Pages
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`

## 🎨 Customization

1. **Update your name**: Edit `src/index.html` line 17
2. **Add GitHub link**: Edit `src/components/header.js` line 18
3. **Customize colors**: Edit `tailwind.config.js`

## 📊 Next Steps

### For Development
1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Run `npm test` to verify everything works
4. ✅ Read [SETUP.md](./SETUP.md) for GitHub setup
5. ✅ Read [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow

### For Deployment
1. ✅ Push to GitHub
2. ✅ Set up branch protection (see [SETUP.md](./SETUP.md))
3. ✅ Enable GitHub Pages
4. ✅ CI/CD will auto-deploy on merge to main

## 🔒 Branch Protection

This project uses branch protection on `main`:
- All changes must go through pull requests
- All tests must pass before merging
- Code must pass linting and formatting checks
- At least 1 approval required

See [SETUP.md](./SETUP.md) for detailed setup instructions.
