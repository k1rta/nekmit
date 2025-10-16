# Test Structure

## 📁 Organized Test Files

Tests are now split into logical categories for better readability and maintenance:

```
tests/
├── homepage-core.spec.js           # Core page elements
├── homepage-navigation.spec.js     # Navigation icons & links
├── homepage-interactions.spec.js   # User interactions
├── homepage-responsive.spec.js     # Responsive design
├── homepage-accessibility.spec.js  # Accessibility features
├── selectors.js                    # Shared test data
└── README.md                       # Test documentation
```

## 📊 Test Distribution

### 1. **homepage-core.spec.js** (4 tests)
Tests fundamental page structure:
- Page title
- Main heading
- Tagline content
- Footer with links

### 2. **homepage-navigation.spec.js** (8 tests)
Tests all navigation icons:
- All 6 icons visible
- Resume link
- GitHub link
- Test reports link
- Health API link
- Email link
- Company registry link

### 3. **homepage-interactions.spec.js** (3 tests)
Tests user interactions:
- Pulse animations
- Hover behavior
- Clickable elements

### 4. **homepage-responsive.spec.js** (4 tests)
Tests responsive behavior:
- Mobile tagline display
- Desktop tagline display
- Icons on mobile
- Tablet layout

### 5. **homepage-accessibility.spec.js** (4 tests)
Tests accessibility features:
- ARIA labels
- Tooltips
- Security (rel="noopener")
- Heading hierarchy

## 🎯 Benefits

### Better Organization
- ✅ Each file has a clear purpose
- ✅ Easy to find specific tests
- ✅ Logical grouping

### Improved Reports
- ✅ Test results grouped by category
- ✅ Easier to identify failing areas
- ✅ Better HTML report structure

### Easier Maintenance
- ✅ Update one category at a time
- ✅ Less merge conflicts
- ✅ Clearer git history

### Parallel Execution
- ✅ Playwright runs files in parallel
- ✅ Faster test execution
- ✅ Better resource utilization

## 📈 Test Report Structure

When you run `npm run test:e2e:report`, the HTML report will show:

```
homepage - core elements
  ✓ should load successfully with correct title
  ✓ should display main heading with correct text
  ✓ should display tagline on desktop
  ✓ should display footer with correct links

homepage - navigation icons
  ✓ should display all 6 navigation icons
  ✓ resume icon should link to pdf
  ... (6 more tests)

homepage - interactions
  ✓ icons should have pulse animation
  ... (2 more tests)

homepage - responsive design
  ✓ should display mobile tagline on small screens
  ... (3 more tests)

homepage - accessibility
  ✓ all icons should have aria-labels
  ... (3 more tests)
```

## 🚀 Running Tests

### Run all tests:
```bash
npm run test:e2e
```

### Run specific category:
```bash
npx playwright test homepage-core
npx playwright test homepage-navigation
npx playwright test homepage-interactions
npx playwright test homepage-responsive
npx playwright test homepage-accessibility
```

### Run multiple categories:
```bash
npx playwright test homepage-core homepage-navigation
```

## 📝 Adding New Tests

### To add a test to existing category:
1. Open the appropriate spec file
2. Add test within existing `test.describe` block
3. Follow existing patterns

### To add a new category:
1. Create new file: `homepage-[category].spec.js`
2. Import from `selectors.js`
3. Use `test.describe('homepage - [category]', ...)`
4. Add tests

## 🎓 Best Practices

✅ **Keep files focused** - One category per file
✅ **Use descriptive names** - Clear what each file tests
✅ **Share data** - Use `selectors.js` for constants
✅ **Consistent naming** - All files start with `homepage-`
✅ **Logical grouping** - Related tests together

---

**Total: 66 tests across 5 files** ✅
