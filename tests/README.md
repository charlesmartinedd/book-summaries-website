# Test Suite Documentation

## Overview

Comprehensive Playwright test suite for the Classic Book Summaries website, covering navigation, modals, keyboard controls, and responsive design.

## Test Structure

### Test File
- `test-website.spec.js` - Main test suite with 21 tests

### Test Organization

Tests are organized into logical groups:

1. **Landing Page Tests** - Initial page load verification
2. **Navigation Tests** - Book switching and back button
3. **Tab Navigation** - Section tabs for both books
4. **Content Rendering** - Card generation and data display
5. **Modal System** - Open/close, navigation, keyboard controls
6. **Page Behavior** - Overflow control, error handling
7. **Visual Tests** - Image handling, responsive layouts
8. **Regression Tests** - Complete visual suite

## Running Tests

```bash
# Run all tests in headless mode
npm test

# Run with browser visible (useful for debugging)
npm run test:headed

# Debug mode (interactive)
npm run test:debug

# View HTML test report
npm run test:report
```

## Configuration

### Playwright Config (`playwright.config.js`)

```javascript
{
  testDir: './tests',
  timeout: 30000,           // 30 second timeout per test
  workers: 1,               // Sequential execution
  reporter: ['html', 'list'],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
}
```

## Test Details

### 1. Landing Page Tests

```javascript
test('Landing page loads correctly with two book cards')
```
- Verifies landing screen is active
- Checks title and subtitle text
- Confirms 2 book cards are present
- Takes screenshot for regression

### 2. Book Navigation

```javascript
test('Clicking Christmas Carol book card switches to book view')
test('Clicking 80 Days book card switches to book view')
test('Toggle buttons switch between books')
test('Back button returns to landing page')
```
- Tests card click navigation
- Verifies toggle button functionality
- Ensures back button works

### 3. Section Tabs

```javascript
test('Christmas Carol section tabs work correctly')
test('80 Days section tabs work correctly')
```
- Christmas Carol: Summary ↔ Book Talk
- 80 Days: Summary ↔ All 37 Chapters ↔ Book Talk

### 4. Content Rendering

```javascript
test('Content cards are rendered in Christmas Carol')
test('Content cards are rendered in 80 Days')
test('All 37 chapters of 80 Days are present and clickable')
```
- Verifies correct number of cards
- Checks data rendering
- Validates all 37 chapters

### 5. Modal System

```javascript
test('Modal opens when clicking a content card')
test('Modal close button works')
test('Modal backdrop click closes modal')
test('Escape key closes modal')
test('Arrow keys navigate between modal items')
test('Modal navigation buttons work')
```
- Tests all modal interactions
- Keyboard navigation (Escape, Left/Right arrows)
- Mouse interactions (click, buttons)

### 6. Page Behavior

```javascript
test('Body overflow is hidden when modal is open')
test('No JavaScript errors occur during normal usage')
```
- Verifies scroll locking
- Monitors console for errors (excluding expected image loading errors)

### 7. Visual Quality

```javascript
test('Images have fallback handling')
test('Responsive layout check')
```
- Checks placeholder images work
- Tests mobile (375px), tablet (768px), desktop (1920px)

### 8. Visual Regression

```javascript
test('Final visual regression test')
```
- Captures screenshots of all major states
- Creates baseline for visual comparison

## Screenshots

All screenshots are saved to `tests/screenshots/`:

### Functional States
- Landing page
- Both book views
- Section tabs
- Modal states
- Navigation examples

### Responsive Views
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (1920x1080)

### Regression Baseline
- 7 final state screenshots
- Covers all major features

## Debugging Failed Tests

### View Failure Artifacts

When a test fails, Playwright captures:

1. **Screenshot** - Visual state at failure
2. **Video** - Recording of the test run
3. **Error Context** - Detailed error information

Location: `test-results/{test-name}/`

### Common Issues

#### Modal Not Closing
- Check z-index layering in CSS
- Verify backdrop click handler
- Ensure keyboard events are bound

#### Content Not Rendering
- Check data files are loaded (christmas-carol.js, eighty-days.js)
- Verify JavaScript initialization
- Check browser console for errors

#### Navigation Not Working
- Verify onclick handlers
- Check screen visibility classes
- Ensure toggle buttons have correct data attributes

## Extending Tests

### Adding a New Test

```javascript
test('Description of what this tests', async ({ page }) => {
  // Navigate to starting point
  await page.goto(htmlFilePath);

  // Perform actions
  await page.locator('.some-element').click();

  // Assert expectations
  await expect(page.locator('.result')).toBeVisible();

  // Optional: Take screenshot
  await page.screenshot({ path: 'tests/screenshots/new-test.png' });
});
```

### Testing New Features

1. Add test to `test-website.spec.js`
2. Use descriptive test names
3. Include assertions for all behaviors
4. Add screenshots for visual features
5. Run tests: `npm test`

### Best Practices

- ✓ Use specific locators (IDs > classes > text)
- ✓ Wait for elements to be visible before interacting
- ✓ Use `page.waitForTimeout()` sparingly (prefer `waitForSelector`)
- ✓ Group related tests with `test.describe()`
- ✓ Clean up state in `beforeEach` if needed
- ✓ Take screenshots of important states

## Continuous Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install chromium
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests Timeout

Increase timeout in `playwright.config.js`:
```javascript
timeout: 60000  // 60 seconds
```

### Screenshots Not Saving

Check directory exists:
```bash
mkdir -p tests/screenshots
```

### Browser Not Installing

```bash
npx playwright install chromium --force
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)

---

**Last Updated:** December 14, 2024
**Test Suite Version:** 1.0
**Playwright Version:** 1.57.0
