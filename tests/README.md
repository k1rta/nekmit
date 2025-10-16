# Test Suite Documentation

## 📁 Structure

```
tests/
├── homepage.spec.js    # Main E2E test suite
├── selectors.js        # Centralized test selectors and constants
└── README.md          # This file
```

## 🎯 Selectors File (`selectors.js`)

The `selectors.js` file centralizes all test data to make tests more maintainable.

### What's Included:

#### 1. **testIds** - Data-testid values
```javascript
import { testIds } from './selectors.js';

page.getByTestId(testIds.mainHeading)
page.getByTestId(testIds.iconResume)
```

#### 2. **links** - Expected URLs
```javascript
import { links } from './selectors.js';

await expect(icon).toHaveAttribute('href', links.github);
```

#### 3. **text** - Expected text content
```javascript
import { text } from './selectors.js';

await expect(heading).toHaveText(text.heading);
```

#### 4. **ariaLabels** - ARIA label values
```javascript
import { ariaLabels } from './selectors.js';

await expect(icon).toHaveAttribute('aria-label', ariaLabels.resume);
```

#### 5. **viewports** - Screen sizes
```javascript
import { viewports } from './selectors.js';

await page.setViewportSize(viewports.mobile);
```

## ✅ Benefits

### 1. **Single Source of Truth**
- All test data in one place
- Update once, applies everywhere
- No hardcoded strings scattered across tests

### 2. **Easy Maintenance**
- Change a URL? Update `selectors.js` only
- Rename a test ID? Update one line
- All tests automatically use new values

### 3. **Type Safety**
- Import errors caught immediately
- Autocomplete in IDE
- Refactoring is safer

### 4. **Better Readability**
```javascript
// Before
await expect(page.getByTestId('icon-github')).toHaveAttribute('href', 'https://github.com/k1rta/nekmit');

// After
await expect(page.getByTestId(testIds.iconGithub)).toHaveAttribute('href', links.github);
```

## 📝 Usage Examples

### Example 1: Testing a Link
```javascript
import { testIds, links } from './selectors.js';

test('github icon should link correctly', async ({ page }) => {
  const icon = page.getByTestId(testIds.iconGithub);
  await expect(icon).toHaveAttribute('href', links.github);
});
```

### Example 2: Responsive Testing
```javascript
import { testIds, viewports } from './selectors.js';

test('should work on mobile', async ({ page }) => {
  await page.setViewportSize(viewports.mobile);
  await page.goto('/');
  
  const heading = page.getByTestId(testIds.mainHeading);
  await expect(heading).toBeVisible();
});
```

### Example 3: Accessibility Testing
```javascript
import { testIds, ariaLabels } from './selectors.js';

test('icons have correct aria labels', async ({ page }) => {
  await expect(page.getByTestId(testIds.iconResume))
    .toHaveAttribute('aria-label', ariaLabels.resume);
});
```

## 🔄 Updating Selectors

### When to Update:

1. **Adding a new element:**
   ```javascript
   // In selectors.js
   export const testIds = {
     // ... existing
     newElement: 'new-element',
   };
   ```

2. **Changing a URL:**
   ```javascript
   // In selectors.js
   export const links = {
     // ... existing
     github: 'https://github.com/new-username/new-repo',
   };
   ```

3. **Adding a viewport:**
   ```javascript
   // In selectors.js
   export const viewports = {
     // ... existing
     largeDesktop: { width: 2560, height: 1440 },
   };
   ```

## 🚀 Running Tests

```bash
# Run all tests
npm run test:e2e

# Run with HTML report
npm run test:e2e:report

# Run specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug
```

## 📊 Test Coverage

- ✅ 63 tests across 3 browsers
- ✅ Core elements (heading, tagline, footer)
- ✅ Navigation icons (all 6 icons)
- ✅ Interactions (animations, hover)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility (ARIA labels, semantic HTML)

## 🎓 Best Practices

1. **Always use selectors from `selectors.js`**
   - Don't hardcode test IDs in tests
   - Import from selectors file

2. **Keep selectors.js organized**
   - Group related selectors
   - Add comments for clarity
   - Use consistent naming

3. **Update selectors when HTML changes**
   - Tests will fail if selectors are outdated
   - Update selectors.js first, then verify tests pass

4. **Use descriptive names**
   - `iconGithub` not `icon1`
   - `viewports.mobile` not `small`

## 🔍 Troubleshooting

### Test fails after HTML change?
1. Check if data-testid was removed/renamed
2. Update `testIds` in selectors.js
3. Re-run tests

### Link test fails?
1. Check if URL changed in HTML
2. Update `links` in selectors.js
3. Re-run tests

### Text assertion fails?
1. Check if text content changed
2. Update `text` in selectors.js
3. Re-run tests

---

**Remember:** The selectors file is your single source of truth for all test data! 🎯
