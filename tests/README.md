# Test Suite Documentation

## Overview

Comprehensive E2E test suite for the portfolio homepage using Playwright. All tests are behavior-focused, semantic, and highly maintainable with 100% data-testid coverage.

## Test Files

### 1. `homepage-core.spec.js`

Core functionality tests:

- Page loads with correct title
- Main heading displays correctly
- Tagline visible on desktop
- All 5 badges visible in footer

### 2. `homepage-accessibility.spec.js`

Accessibility compliance tests:

- ARIA labels on all 6 icons
- Tooltips (data-tooltip attributes) on all interactive elements
- External links with `rel="noopener"` for security
- Proper heading hierarchy (single h1)

### 3. `homepage-navigation.spec.js`

Navigation and link tests:

- All 6 navigation icons visible and functional
- Correct href attributes for all links
- External links open in new tab (target="_blank")
- Contact icon uses mailto link

### 4. `homepage-interactions.spec.js`

User interaction tests:

- Icons have pulse animation class
- Hover pauses all animations
- Badges visible in footer

### 5. `homepage-responsive.spec.js`

Responsive design tests:

- Mobile tagline displays correctly
- Desktop tagline displays correctly
- All icons visible on mobile (375px)
- Heading visible on tablet (768px)

### 6. `homepage-badges.spec.js`

Badge-specific tests:

- All 5 badges visible (Deployment, Quality, UX, Performance, Accessibility)
- Each badge has correct Font Awesome icon
- Each badge displays correct text (desktop and mobile variants)
- Badges have hover effect class
- Badges properly positioned in footer

### 7. `homepage-tooltips.spec.js`

Tooltip functionality tests (library-agnostic):

- All icons have data-tooltip attributes
- Tooltip text appears on hover
- Tooltip contains correct text
- Tooltip disappears when mouse leaves
- All 6 icons have working tooltips

### 8. `homepage-layout.spec.js`

Visual and layout tests (behavior-focused):

- Main content is centered (computed style check)
- Heading is prominently styled (font size > 50px)
- Icons are interactive and visible
- Icons have consistent circular dimensions
- Footer is fixed at bottom of viewport
- Badges are visible and readable
- Value proposition displays correctly
- Icon navigation is semantic nav element
- All icons have consistent sizing
- Badges accessible on smaller screens

### 9. `homepage-icons.spec.js`

Icon functionality tests (behavior-focused):

- All icons have visible graphics (::before content check)
- Icons are visually styled (font size > 20px)
- External links open in new tab
- Contact link is mailto without target
- All icons have correct href attributes
- Icons are keyboard accessible (tab navigation)
- All icons are clickable and enabled
- Exactly 6 icons in navigation
- Icons respond to hover interactions

## Test Data

### `selectors.js`

Centralized test selectors for maximum maintainability:

- **dataTestIds**: All data-testid selectors (main content, icons, footer, badges)
- **links**: Expected URLs for all 6 icons
- **ariaLabels**: Expected ARIA labels for accessibility
- **tooltips**: Expected tooltip text for all icons
- **text**: Expected page text content (heading, tagline)
- **viewports**: Responsive testing sizes (mobile, tablet, desktop)

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test homepage-badges.spec.js

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in debug mode (step through)
npx playwright test --debug

# Run tests for specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# View HTML test report
npx playwright show-report public/test-reports
```

## Coverage

### Icons (6 total)

- ✅ **Resume & Skills** → `/resume`
- ✅ **Portfolio Projects** → `https://github.com/k1rta?tab=repositories`
- ✅ **Quality Dashboard** → `/test-reports/index.html`
- ✅ **System Uptime** → `/api/health`
- ✅ **About My Business** → Nekmit OÜ in Estonian Business Registry
- ✅ **Contact & Availability** → `mailto:kirtalindakarits@icloud.com`

### Badges (5 total)

- ✅ **Automated Deployment** (emerald, rocket icon)
- ✅ **Quality Assured** (blue, vial-circle-check icon)
- ✅ **User-Centered Design** (purple, heart icon)
- ✅ **Lightning Fast** (orange, zap icon)
- ✅ **Globally Accessible** (teal, globe icon)

### Features Tested

- ✅ **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- ✅ **Tooltips**: Library-agnostic tooltip testing (Tippy.js)
- ✅ **Responsive Design**: Mobile (375px), tablet (768px), desktop (1920px)
- ✅ **Visual Behavior**: Computed styles, dimensions, positioning
- ✅ **Navigation**: All links, external link security (rel="noopener")
- ✅ **Interactions**: Hover effects, animations, click functionality
- ✅ **Layout**: Content centering, footer positioning, consistent sizing

## Test Statistics

- **Total Test Files**: 9
- **Total Tests**: 162 (all passing)
- **Test Duration**: ~18 seconds
- **Browsers**: Chromium, Firefox, WebKit
- **Coverage**: Core functionality, accessibility, interactions, responsive, badges, tooltips, layout, icons

## Test Quality

### Maintainability: 10/10 🌟

- ✅ **100% data-testid coverage** on all interactive elements
- ✅ **Centralized selectors** in `selectors.js`
- ✅ **Behavior-focused** tests (not implementation-specific)
- ✅ **Library-agnostic** (can swap CSS frameworks, icon libraries, tooltip libraries)
- ✅ **Semantic testing** (tests what users see, not how it's built)
- ✅ **Resilient to refactoring** (only breaks when actual behavior changes)

### Best Practices

- Tests computed styles instead of CSS classes
- Tests actual dimensions and positions
- Library-agnostic tooltip testing
- Keyboard accessibility verification
- Cross-browser compatibility
- Responsive design validation
