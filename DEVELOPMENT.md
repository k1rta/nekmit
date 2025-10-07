# Development Guide

## Quick Start (Restored Simple Setup)

**Start development server**:

```bash
npm run dev
```

This runs Vite and gives you:

- Frontend at `http://localhost:5173` (typically)
- **Fast hot reload** - instant changes
- **No building required**

## Development Workflow

### ✅ Recommended: Fast Frontend Development (Vite)

```bash
npm run dev
```

- **Super fast startup** and hot reload
- **No building** - just save and see changes
- Perfect for UI development and most work

### When You Need APIs: Full-Stack Development

```bash
npm run dev:api
```

- Frontend + API endpoints at `http://localhost:3000`
- Use only when testing API integration
- Slower startup but full functionality

## Testing Your Setup

**Frontend development**:

1. Start dev server: `npm run dev`
2. Visit: `http://localhost:5173`

**API testing**:

1. Start API server: `npm run dev:api`
2. Visit: `http://localhost:3000`
3. Test API: `http://localhost:3000/api/health`
4. Test status page: `http://localhost:3000/status`

## Running Tests

**End-to-end tests** (using Playwright):

```bash
npm run test:e2e
```

- Tests automatically build and run production preview
- Tests frontend functionality and graceful API fallbacks
- Includes accessibility and mobile responsiveness tests

**View test reports**:

```bash
npm run test:e2e:report
```

## When Do You Need to Build?

**Never for development!** Only build for:

- Production deployment
- Testing production build locally

```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

## Common Issues

- **Port conflicts**: If port 3000 is busy, Vercel will use 3001, 3002, etc.
- **API not working**: Make sure you're using `npm run dev:api` (not `npm run dev`)
- **Changes not showing**: Hard refresh (Cmd+Shift+R) or check console for errors
