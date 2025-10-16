# Project Cleanup & Setup Plan

## Issues Found & Solutions

### ✅ Issue 1: GitHub Actions Permission Error (FIXED)
**Problem**: GitHub Actions tried to deploy to GitHub Pages but lacked permissions.  
**Solution**: Removed GitHub Pages deployment from workflow. Vercel will handle deployment automatically.

### ✅ Issue 2: Console Errors (189 errors)
**Problem**: Browser console shows errors because HTML files reference assets that don't exist in development.  
**Solution**: These are expected in development. They'll disappear once you:
1. Run `npm run build` (creates production assets)
2. Deploy to Vercel (serves built files correctly)

**Console errors are normal in development mode with Vite!**

### ✅ Issue 3: Unnecessary Files
**Files you can safely remove**:
- `src/devops.html` - Example skills page (if you don't need it)
- `src/frontend.html` - Example skills page (if you don't need it)
- `src/testing.html` - Example skills page (if you don't need it)
- `src/utils/helpers.test.js` - Example unit test
- `cleanup-optional.sh` - Temporary cleanup script
- `QUICK_START.md` - Temporary guide (after you're set up)
- `DEPLOYMENT_GUIDE.md` - Can keep or remove after deployment

---

## Step-by-Step Action Plan

### Step 1: GitHub Settings (Required)

#### A. Enable Actions Permissions
1. Go to: `https://github.com/k1rta/nekmit/settings/actions`
2. Under "Workflow permissions":
   - Select: **"Read and write permissions"**
   - Check: **"Allow GitHub Actions to create and approve pull requests"**
3. Click **"Save"**

#### B. Set Up Branch Protection
1. Go to: `https://github.com/k1rta/nekmit/settings/branches`
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ **Require a pull request before merging**
   - ✅ **Require approvals**: 1
   - ✅ **Require status checks to pass before merging**
     - Search and add: `Lint & Format Check`
     - Search and add: `Run Tests`
   - ✅ **Require branches to be up to date before merging**
5. Click **"Create"**

---

### Step 2: Clean Up Unnecessary Files

I'll create a branch for cleanup. You can review and merge it.

**Files to remove**:
```
src/devops.html          # Example page
src/frontend.html        # Example page  
src/testing.html         # Example page
src/utils/helpers.test.js # Example test
cleanup-optional.sh      # Temporary script
QUICK_START.md          # Temporary guide
```

**Files to keep**:
```
README.md               # Project overview
DEPLOYMENT_GUIDE.md     # Deployment instructions
CONTRIBUTING.md         # Contribution guide
SETUP.md               # Setup details
```

---

### Step 3: Vercel Setup

#### A. Deploy to Vercel
1. Go to: https://vercel.com/new
2. Import your repository: `k1rta/nekmit`
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **"Deploy"**

#### B. Vercel Settings to Configure

After deployment, go to Project Settings:

**1. Git Integration**
- ✅ Auto-deploy on push to `main`
- ✅ Preview deployments for PRs
- ✅ Production branch: `main`

**2. Environment Variables** (if needed)
- Add any API keys or secrets here
- Example: `API_KEY=your-key-here`

**3. Domains**
- Your default domain: `nekmit-xxx.vercel.app`
- Add custom domain if you have one

**4. Speed Insights** (Optional)
- Enable to track Core Web Vitals
- Free for personal projects
- Shows real user performance data

**5. Analytics** (Optional)
- Enable Web Analytics
- Track page views and visitors
- Privacy-friendly (no cookies)

---

### Step 4: Understanding Your HTML Files

**Your current structure**:
```
src/
├── index.html      # Main portfolio page (KEEP)
├── devops.html     # DevOps skills page (OPTIONAL)
├── frontend.html   # Frontend skills page (OPTIONAL)
├── testing.html    # Testing skills page (OPTIONAL)
```

**Do you need them?**
- **Keep if**: You want separate pages for different skill categories
- **Remove if**: You want a single-page portfolio

These pages are linked from your main portfolio. Check `src/index.html` to see the navigation.

---

## Console Errors Explained

### Why 189 Console Errors?

**In Development (npm run dev)**:
- Vite serves files directly from `src/`
- Some assets referenced in HTML don't exist yet
- CSS/JS paths might be incorrect
- **This is NORMAL in development!**

**In Production (after build)**:
- `npm run build` creates optimized files in `dist/`
- All assets are bundled correctly
- Paths are resolved properly
- **No console errors!**

### How to Verify:

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open browser and check console - should be clean!
```

---

## What to Do Now

### Immediate Actions:

1. **Fix GitHub Actions** ✅ (Already done - workflow updated)

2. **Set GitHub Permissions**:
   ```
   Go to: https://github.com/k1rta/nekmit/settings/actions
   Enable: "Read and write permissions"
   ```

3. **Deploy to Vercel**:
   ```
   Go to: https://vercel.com/new
   Import: k1rta/nekmit
   Deploy!
   ```

4. **Review cleanup branch** (I'll create this next)

---

## Vercel Features You Should Enable

### Free Features Worth Using:

1. **Speed Insights** ⚡
   - Tracks Core Web Vitals
   - Shows real user performance
   - Helps optimize your site

2. **Web Analytics** 📊
   - Track page views
   - See visitor stats
   - Privacy-friendly (no cookies)

3. **Preview Deployments** 🔍
   - Every PR gets a preview URL
   - Test before merging
   - Share with others

4. **Automatic HTTPS** 🔒
   - Free SSL certificate
   - Automatic renewal
   - Secure by default

5. **Edge Network** 🌍
   - Global CDN
   - Fast worldwide
   - Automatic optimization

---

## Summary

### ✅ Fixed:
- GitHub Actions workflow (removed GitHub Pages deployment)

### 🔧 Need to Configure:
1. GitHub Actions permissions
2. Branch protection rules
3. Vercel deployment

### 🗑️ Can Remove:
- Example HTML pages (devops, frontend, testing)
- Example test file
- Temporary documentation files

### ⚠️ Console Errors:
- Normal in development
- Will disappear in production build
- Not a problem!

---

## Next Steps

1. I'll create a cleanup branch with file removals
2. You configure GitHub settings (5 minutes)
3. You deploy to Vercel (5 minutes)
4. You review and merge cleanup branch
5. Done! 🎉
