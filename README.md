# Modern Portfolio with Live Test Reports & Health Monitoring

## 🎯 Features

- **Live Test Reports**: Click the icon to view Playwright test results
- **Health Monitoring API**: Real-time system health endpoint
- **CI/CD Pipeline**: Automated testing on every PR
- **Modern Stack**: Vite + Tailwind + Web Components

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

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm test                 # Run all tests
npm run test:e2e         # Run E2E tests
npm run test:e2e:report  # Run tests + generate HTML report
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

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Run `npm run test:e2e:report`
4. ✅ Click icons to see live data
5. ✅ Push to GitHub
6. ✅ Enable GitHub Pages
7. ✅ Share your portfolio!
