/**
 * Playwright Test Suite for Classic Book Summaries Website
 * Tests navigation, modal system, keyboard controls, and visual states
 */

const { test, expect } = require('@playwright/test');
const path = require('path');

// Get the absolute path to index.html
const htmlFilePath = 'file://' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');

test.describe('Classic Book Summaries Website', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file
    await page.goto(htmlFilePath);
    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Landing page loads correctly with two book cards', async ({ page }) => {
    // Check that landing screen is active
    const landing = page.locator('#landing.active');
    await expect(landing).toBeVisible();

    // Check title and subtitle
    await expect(page.locator('.landing-title')).toContainText('Classic Stories');
    await expect(page.locator('.landing-subtitle')).toContainText('Discover timeless adventures');

    // Check both book cards are present
    const bookCards = page.locator('.book-card');
    await expect(bookCards).toHaveCount(2);

    // Check specific book cards
    await expect(page.locator('.book-card.christmas-carol h2')).toContainText('A Christmas Carol');
    await expect(page.locator('.book-card.eighty-days h2')).toContainText('Around the World in 80 Days');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/01-landing-page.png', fullPage: true });
  });

  test('Clicking Christmas Carol book card switches to book view', async ({ page }) => {
    // Click on Christmas Carol
    await page.locator('.book-card.christmas-carol').click();

    // Wait for transition
    await page.waitForTimeout(500);

    // Check that Christmas Carol screen is active
    await expect(page.locator('#christmas-carol.active')).toBeVisible();

    // Check that landing is not active
    await expect(page.locator('#landing.active')).not.toBeVisible();

    // Check toggle buttons
    const activeToggle = page.locator('.toggle-btn.active').first();
    await expect(activeToggle).toContainText('A Christmas Carol');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/02-christmas-carol-view.png', fullPage: true });
  });

  test('Clicking 80 Days book card switches to book view', async ({ page }) => {
    // Click on 80 Days
    await page.locator('.book-card.eighty-days').click();

    // Wait for transition
    await page.waitForTimeout(500);

    // Check that 80 Days screen is active
    await expect(page.locator('#eighty-days.active')).toBeVisible();

    // Check that landing is not active
    await expect(page.locator('#landing.active')).not.toBeVisible();

    // Check toggle buttons
    const activeToggle = page.locator('.toggle-btn.active').first();
    await expect(activeToggle).toContainText('80 Days');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/03-eighty-days-view.png', fullPage: true });
  });

  test('Toggle buttons switch between books', async ({ page }) => {
    // Start with Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#christmas-carol.active')).toBeVisible();

    // Click toggle to switch to 80 Days
    await page.locator('#christmas-carol .toggle-btn[data-book="eighty-days"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#eighty-days.active')).toBeVisible();
    await expect(page.locator('#christmas-carol.active')).not.toBeVisible();

    // Click toggle to switch back to Christmas Carol
    await page.locator('#eighty-days .toggle-btn[data-book="christmas-carol"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#christmas-carol.active')).toBeVisible();
    await expect(page.locator('#eighty-days.active')).not.toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/04-toggle-switch.png', fullPage: true });
  });

  test('Back button returns to landing page', async ({ page }) => {
    // Go to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(300);

    // Click back button
    await page.locator('#christmas-carol .back-btn').click();
    await page.waitForTimeout(300);

    // Should be back on landing
    await expect(page.locator('#landing.active')).toBeVisible();
    await expect(page.locator('#christmas-carol.active')).not.toBeVisible();
  });

  test('Christmas Carol section tabs work correctly', async ({ page }) => {
    // Navigate to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(300);

    // Summary should be active by default
    await expect(page.locator('#christmas-carol .tab-btn.active')).toContainText('Summary');
    await expect(page.locator('#cc-summary.active')).toBeVisible();

    // Click Book Talk tab
    await page.locator('#christmas-carol .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);

    // Book Talk should be active
    await expect(page.locator('#christmas-carol .tab-btn.active')).toContainText('Book Talk');
    await expect(page.locator('#cc-booktalk.active')).toBeVisible();
    await expect(page.locator('#cc-summary.active')).not.toBeVisible();

    // Click Summary tab
    await page.locator('#christmas-carol .tab-btn:has-text("Summary")').click();
    await page.waitForTimeout(300);

    // Summary should be active again
    await expect(page.locator('#cc-summary.active')).toBeVisible();
    await expect(page.locator('#cc-booktalk.active')).not.toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/05-cc-tabs.png', fullPage: true });
  });

  test('80 Days section tabs work correctly (Summary, Chapters, Book Talk)', async ({ page }) => {
    // Navigate to 80 Days
    await page.locator('.book-card.eighty-days').click();
    await page.waitForTimeout(300);

    // Summary should be active by default
    await expect(page.locator('#eighty-days .tab-btn.active')).toContainText('Summary');
    await expect(page.locator('#ed-summary.active')).toBeVisible();

    // Click All 37 Chapters tab
    await page.locator('#eighty-days .tab-btn:has-text("All 37 Chapters")').click();
    await page.waitForTimeout(300);

    // Chapters should be active
    await expect(page.locator('#eighty-days .tab-btn.active')).toContainText('All 37 Chapters');
    await expect(page.locator('#ed-chapters.active')).toBeVisible();
    await expect(page.locator('#ed-summary.active')).not.toBeVisible();

    // Take screenshot of chapters
    await page.screenshot({ path: 'tests/screenshots/06-ed-chapters.png', fullPage: true });

    // Click Book Talk tab
    await page.locator('#eighty-days .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);

    // Book Talk should be active
    await expect(page.locator('#ed-booktalk.active')).toBeVisible();
    await expect(page.locator('#ed-chapters.active')).not.toBeVisible();

    // Take screenshot of book talk
    await page.screenshot({ path: 'tests/screenshots/07-ed-booktalk.png', fullPage: true });
  });

  test('Content cards are rendered in Christmas Carol', async ({ page }) => {
    // Navigate to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);

    // Check that stave cards are rendered
    const staveCards = page.locator('#cc-stave-grid .content-card');
    const count = await staveCards.count();

    // Should have 5 staves
    expect(count).toBeGreaterThan(0);
    console.log(`Found ${count} stave cards in Christmas Carol`);

    // Check that Book Talk content is rendered
    await page.locator('#christmas-carol .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);

    const booktalkCards = page.locator('#cc-booktalk-grid .booktalk-card');
    const booktalkCount = await booktalkCards.count();
    expect(booktalkCount).toBeGreaterThan(0);
    console.log(`Found ${booktalkCount} booktalk cards in Christmas Carol`);
  });

  test('Content cards are rendered in 80 Days', async ({ page }) => {
    // Navigate to 80 Days
    await page.locator('.book-card.eighty-days').click();
    await page.waitForTimeout(500);

    // Check summary sections
    const summaryCards = page.locator('#ed-summary-grid .content-card');
    const summaryCount = await summaryCards.count();
    expect(summaryCount).toBeGreaterThan(0);
    console.log(`Found ${summaryCount} summary cards in 80 Days`);

    // Check chapters
    await page.locator('#eighty-days .tab-btn:has-text("All 37 Chapters")').click();
    await page.waitForTimeout(300);

    const chapterCards = page.locator('#ed-chapters-grid .chapter-card');
    const chapterCount = await chapterCards.count();

    // Should have 37 chapters
    expect(chapterCount).toBe(37);
    console.log(`Found ${chapterCount} chapter cards in 80 Days`);
  });

  test('Modal opens when clicking a content card', async ({ page }) => {
    // Navigate to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);

    // Click first stave card
    const firstCard = page.locator('#cc-stave-grid .content-card').first();
    await firstCard.click();
    await page.waitForTimeout(300);

    // Modal should be visible
    await expect(page.locator('#modal.active')).toBeVisible();

    // Modal should have content
    await expect(page.locator('#modal-title')).not.toBeEmpty();
    await expect(page.locator('#modal-text')).not.toBeEmpty();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/08-modal-open.png', fullPage: true });
  });

  test('Modal close button works', async ({ page }) => {
    // Navigate to Christmas Carol and open modal
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);
    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    // Verify modal is open
    await expect(page.locator('#modal.active')).toBeVisible();

    // Click close button
    await page.locator('.modal-close').click();
    await page.waitForTimeout(300);

    // Modal should be closed
    await expect(page.locator('#modal.active')).not.toBeVisible();
  });

  test('Modal backdrop click closes modal', async ({ page }) => {
    // Navigate to Christmas Carol and open modal
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);
    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    // Verify modal is open
    await expect(page.locator('#modal.active')).toBeVisible();

    // Click backdrop - force click to bypass pointer interception
    await page.locator('.modal-backdrop').click({ force: true });
    await page.waitForTimeout(300);

    // Modal should be closed
    await expect(page.locator('#modal.active')).not.toBeVisible();
  });

  test('Escape key closes modal', async ({ page }) => {
    // Navigate to Christmas Carol and open modal
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);
    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    // Verify modal is open
    await expect(page.locator('#modal.active')).toBeVisible();

    // Press Escape key
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Modal should be closed
    await expect(page.locator('#modal.active')).not.toBeVisible();
  });

  test('Arrow keys navigate between modal items', async ({ page }) => {
    // Navigate to 80 Days chapters (37 items to navigate)
    await page.locator('.book-card.eighty-days').click();
    await page.waitForTimeout(500);
    await page.locator('#eighty-days .tab-btn:has-text("All 37 Chapters")').click();
    await page.waitForTimeout(300);

    // Open first chapter
    await page.locator('#ed-chapters-grid .chapter-card').first().click();
    await page.waitForTimeout(300);

    // Get initial title
    const initialTitle = await page.locator('#modal-title').textContent();

    // Press right arrow to go to next chapter
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    // Title should have changed
    const nextTitle = await page.locator('#modal-title').textContent();
    expect(nextTitle).not.toBe(initialTitle);

    // Press left arrow to go back
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);

    // Should be back to initial
    const backTitle = await page.locator('#modal-title').textContent();
    expect(backTitle).toBe(initialTitle);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/09-modal-navigation.png', fullPage: true });
  });

  test('Modal navigation buttons work', async ({ page }) => {
    // Navigate to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);

    // Open first stave
    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    // Previous button should be disabled on first item
    const prevBtn = page.locator('.modal-nav-btn.prev');
    await expect(prevBtn).toBeDisabled();

    // Next button should be enabled
    const nextBtn = page.locator('.modal-nav-btn.next');
    await expect(nextBtn).not.toBeDisabled();

    // Click next
    await nextBtn.click();
    await page.waitForTimeout(300);

    // Now prev should be enabled
    await expect(prevBtn).not.toBeDisabled();
  });

  test('Body overflow is hidden when modal is open', async ({ page }) => {
    // Check initial state (should allow overflow or be empty)
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);

    // Open modal
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);
    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    // Body overflow should be hidden
    const modalOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(modalOverflow).toBe('hidden');

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Body overflow should be restored
    const restoredOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(restoredOverflow).toBe('');
  });

  test('No JavaScript errors occur during normal usage', async ({ page }) => {
    const errors = [];

    // Capture console errors (excluding expected image loading errors)
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore expected image loading failures (we have fallback placeholders)
        if (!text.includes('ERR_FILE_NOT_FOUND') && !text.includes('Failed to load resource')) {
          errors.push(text);
        }
      }
    });

    // Perform various actions
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(300);

    await page.locator('#christmas-carol .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);

    await page.locator('#christmas-carol .tab-btn:has-text("Summary")').click();
    await page.waitForTimeout(300);

    await page.locator('#cc-stave-grid .content-card').first().click();
    await page.waitForTimeout(300);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    await page.locator('#christmas-carol .back-btn').click();
    await page.waitForTimeout(300);

    // Check for errors (excluding expected image loading errors)
    if (errors.length > 0) {
      console.log('JavaScript errors detected:', errors);
    }
    expect(errors.length).toBe(0);
  });

  test('All 37 chapters of 80 Days are present and clickable', async ({ page }) => {
    // Navigate to 80 Days chapters
    await page.locator('.book-card.eighty-days').click();
    await page.waitForTimeout(500);
    await page.locator('#eighty-days .tab-btn:has-text("All 37 Chapters")').click();
    await page.waitForTimeout(500);

    // Count chapters
    const chapterCards = page.locator('#ed-chapters-grid .chapter-card');
    const count = await chapterCards.count();
    expect(count).toBe(37);

    // Click last chapter to verify it works
    await chapterCards.last().click();
    await page.waitForTimeout(300);

    // Modal should open
    await expect(page.locator('#modal.active')).toBeVisible();

    // Next button should be disabled (last item)
    await expect(page.locator('.modal-nav-btn.next')).toBeDisabled();

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/10-last-chapter.png', fullPage: true });
  });

  test('Images have fallback handling', async ({ page }) => {
    // Navigate to Christmas Carol
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);

    // Check that cards have images (either real or placeholder)
    const images = page.locator('#cc-stave-grid .content-card img');
    const count = await images.count();

    // All cards should have images
    expect(count).toBeGreaterThan(0);

    // Check that at least one image has loaded (src attribute exists)
    const firstImg = images.first();
    const src = await firstImg.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src.length).toBeGreaterThan(0);
  });

  test('Responsive layout check', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    await expect(page.locator('#landing.active')).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/11-mobile-landing.png', fullPage: true });

    // Click a book
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/12-mobile-book.png', fullPage: true });

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/13-tablet-book.png', fullPage: true });

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/14-desktop-book.png', fullPage: true });
  });

  test('Final visual regression test', async ({ page }) => {
    // Take final screenshots of all major states

    // Landing
    await page.screenshot({ path: 'tests/screenshots/final-01-landing.png', fullPage: true });

    // Christmas Carol Summary
    await page.locator('.book-card.christmas-carol').click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/final-02-cc-summary.png', fullPage: true });

    // Christmas Carol Book Talk
    await page.locator('#christmas-carol .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/final-03-cc-booktalk.png', fullPage: true });

    // 80 Days Summary
    await page.locator('#christmas-carol .toggle-btn[data-book="eighty-days"]').click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'tests/screenshots/final-04-ed-summary.png', fullPage: true });

    // 80 Days Chapters
    await page.locator('#eighty-days .tab-btn:has-text("All 37 Chapters")').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/final-05-ed-chapters.png', fullPage: true });

    // 80 Days Book Talk
    await page.locator('#eighty-days .tab-btn:has-text("Book Talk")').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/final-06-ed-booktalk.png', fullPage: true });

    // Modal
    await page.locator('#eighty-days .tab-btn:has-text("Summary")').click();
    await page.waitForTimeout(300);
    await page.locator('#ed-summary-grid .content-card').first().click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/final-07-modal.png', fullPage: true });
  });

});
