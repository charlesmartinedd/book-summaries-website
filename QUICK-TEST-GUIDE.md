# Quick Test Guide

## Run Tests

```bash
# All tests (headless - recommended)
npm test

# With visible browser (for debugging)
npm run test:headed

# Interactive debugging
npm run test:debug

# View HTML report after tests
npm run test:report
```

## Test Status

**21/21 tests passing** ✓

## What Gets Tested

- ✓ Landing page with 2 books
- ✓ Book navigation (click cards, toggle buttons, back button)
- ✓ Section tabs (Summary, Chapters, Book Talk)
- ✓ Modal system (open, close, keyboard, navigation)
- ✓ All 37 chapters for 80 Days
- ✓ Responsive design (mobile, tablet, desktop)
- ✓ No JavaScript errors

## Screenshots

21 screenshots in: `tests/screenshots/`

## Bugs Fixed

1. **Modal backdrop z-index** - Now clickable
2. **Image loading errors** - Expected, handled by fallbacks

## Files

- `tests/test-website.spec.js` - Test suite
- `playwright.config.js` - Configuration
- `TEST-REPORT.md` - Detailed results
- `TESTING-SUMMARY.md` - Executive summary

## Status: PRODUCTION READY ✓
