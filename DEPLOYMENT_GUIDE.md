# Complete Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Recommended)
1. Go to https://github.com/new
2. **Repository name**: `nekmit`
3. **Description**: "Modern portfolio with test reports and health monitoring"
4. **Visibility**: Public (or Private)
5. **DO NOT** check any boxes (no README, .gitignore, or license)
6. Click **"Create repository"**

### Option B: Via GitHub CLI (if installed)
```bash
gh repo create nekmit --public --source=. --remote=origin --push
```

---

## Step 2: Push Your Code to GitHub

Once the repository is created on GitHub:

```bash
# Verify remote is set
git remote -v

# Push main branch
git push -u origin main

# Push develop branch
git push -u origin develop
```

If you get errors, remove and re-add the remote:
```bash
git remote remove origin
git remote add origin https://github.com/k1rta/nekmit.git
git push -u origin main
git push -u origin develop
```

---

## Step 3: Deploy to Vercel (Recommended)

### Why Vercel?
- ✅ Perfect for Vite projects
- ✅ Automatic deployments on every push
- ✅ Preview deployments for PRs
- ✅ Free SSL and custom domains
- ✅ Global CDN

### Setup Steps:

1. **Go to Vercel**: https://vercel.com/signup
2. **Sign up**: Use your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your `nekmit` repository
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - Click **"Deploy"**

5. **Done!** Your site will be live at: `https://nekmit-xxx.vercel.app`

### Custom Domain (Optional):
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

## Step 4: Set Up Branch Protection on GitHub

1. Go to your GitHub repository
2. **Settings** → **Branches**
3. Click **"Add rule"**
4. **Branch name pattern**: `main`
5. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass before merging
     - Search and add: `Lint & Format Check`
     - Search and add: `Run Tests`
   - ✅ Require branches to be up to date before merging
6. Click **"Create"**

---

## Step 5: Verify Everything Works

### Test CI/CD:
```bash
# Create a test branch
git checkout -b test/deployment

# Make a small change
echo "# Test" >> test.md

# Commit and push
git add test.md
git commit -m "test: verify CI/CD pipeline"
git push -u origin test/deployment
```

### Check:
1. Go to GitHub → Actions tab
2. You should see the workflow running
3. All checks should pass ✅

### Create PR:
1. Go to GitHub → Pull Requests
2. Click "New pull request"
3. Base: `main`, Compare: `test/deployment`
4. Create PR and verify checks pass

---

## Alternative: Deploy to Netlify

1. **Go to Netlify**: https://app.netlify.com/signup
2. **Sign up**: Use your GitHub account
3. **Add new site** → Import from Git
4. **Select**: Your `nekmit` repository
5. **Configure**:
   - **Branch**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

---

## Alternative: Deploy to GitHub Pages

### Update `.github/workflows/ci.yml`:

Add this job at the end:

```yaml
  deploy-pages:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install and Build
        run: |
          npm ci
          npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### Enable GitHub Pages:
1. Go to Settings → Pages
2. Source: GitHub Actions
3. Save

---

## Cleanup Optional Files (Optional)

If you want to remove temporary documentation:

```bash
# Make script executable
chmod +x cleanup-optional.sh

# Run cleanup
./cleanup-optional.sh

# Commit changes
git add .
git commit -m "chore: remove temporary documentation"
git push
```

---

## Quick Reference

### Your URLs (after deployment):
- **GitHub**: https://github.com/k1rta/nekmit
- **Vercel**: https://nekmit-xxx.vercel.app (after setup)
- **GitHub Pages**: https://k1rta.github.io/nekmit (if using Pages)

### Common Commands:
```bash
# Start development
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint:fix
npm run format
```

### Workflow:
1. Work on feature branches
2. Commit with conventional format: `feat: description`
3. Push and create PR
4. Wait for CI checks to pass
5. Merge to main
6. Auto-deploys to hosting

---

## Troubleshooting

### "Repository not found" error:
- Make sure you created the repository on GitHub first
- Check the URL: `https://github.com/k1rta/nekmit`
- Try removing and re-adding the remote

### Tests fail on CI:
- Run tests locally first: `npm test`
- Fix any issues before pushing
- Check GitHub Actions logs for details

### Build fails on Vercel/Netlify:
- Verify build command: `npm run build`
- Verify output directory: `dist`
- Check build logs for errors

### Need help?
- Check GitHub Actions logs
- Check Vercel/Netlify deployment logs
- Review error messages carefully

---

## Summary

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel (or Netlify/Pages)
4. ✅ Set up branch protection
5. ✅ Start developing!

Your site will auto-deploy on every push to `main`. 🚀
