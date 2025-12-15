/**
 * Classic Book Summaries - App Logic
 * Handles navigation, modals, and content rendering
 */

// ==========================================
// STATE MANAGEMENT
// ==========================================

let currentBook = null;
let currentSection = null;
let currentModalItems = [];
let currentModalIndex = 0;
let currentStave = "stave2"; // Track which stave questions to show

// ==========================================
// NAVIGATION
// ==========================================

function showLanding() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('landing').classList.add('active');
    currentBook = null;
    currentSection = null;
    saveState();
}

function showBook(bookId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    const screenId = bookId === 'eighty-days' ? 'eighty-days' : 'christmas-carol';
    document.getElementById(screenId).classList.add('active');

    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.book === bookId);
    });

    currentBook = bookId;

    // Show first section by default
    const prefix = bookId === 'eighty-days' ? 'ed' : 'cc';
    showSection(prefix, 'summary');

    saveState();
}

function showSection(prefix, sectionId) {
    const container = document.getElementById(prefix === 'ed' ? 'eighty-days' : 'christmas-carol');

    // Hide all sections
    container.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    // Show selected section
    const section = document.getElementById(`${prefix}-${sectionId}`);
    if (section) {
        section.classList.add('active');
    }

    // Update tab buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        let btnSection;
        if (btnText.includes('summary')) btnSection = 'summary';
        else if (btnText.includes('chapter')) btnSection = 'chapters';
        else if (btnText.includes('question')) btnSection = 'questions';
        else btnSection = 'booktalk';
        btn.classList.toggle('active', btnSection === sectionId);
    });

    currentSection = sectionId;
    saveState();
}

// ==========================================
// MODAL SYSTEM
// ==========================================

function openModal(items, index) {
    currentModalItems = items;
    currentModalIndex = index;

    const item = items[index];

    document.getElementById('modal-img').src = item.image || getPlaceholderImage(item.title);
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-text').innerHTML = item.content;

    // Update nav button states
    document.querySelector('.modal-nav-btn.prev').disabled = index === 0;
    document.querySelector('.modal-nav-btn.next').disabled = index === items.length - 1;

    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateModal(direction) {
    const newIndex = currentModalIndex + direction;
    if (newIndex >= 0 && newIndex < currentModalItems.length) {
        openModal(currentModalItems, newIndex);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!document.getElementById('modal').classList.contains('active')) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
});

// ==========================================
// CONTENT RENDERING
// ==========================================

function renderChristmasCarol() {
    if (typeof christmasCarolData === 'undefined') {
        console.warn('Christmas Carol data not loaded');
        return;
    }

    // Render Staves (Summary)
    const staveGrid = document.getElementById('cc-stave-grid');
    staveGrid.innerHTML = christmasCarolData.staves.map((stave, index) => `
        <div class="content-card" onclick="openModal(christmasCarolData.staves, ${index})">
            <div class="content-card-image">
                <img src="${stave.image || getPlaceholderImage(stave.title)}"
                     alt="${stave.title}"
                     onerror="this.src='${getPlaceholderImage(stave.title)}'">
            </div>
            <div class="content-card-body">
                <h3>${stave.title}</h3>
                <p>${truncate(stave.summary, 120)}</p>
            </div>
        </div>
    `).join('');

    // Render Study Questions
    renderStudyQuestions();

    // Render Book Talk
    const booktalkGrid = document.getElementById('cc-booktalk-grid');
    const bt = christmasCarolData.bookTalk;

    booktalkGrid.innerHTML = `
        <div class="booktalk-card">
            <h3>Book Info</h3>
            <div class="value">
                <strong>${bt.title}</strong><br>
                First Published: ${bt.published}
            </div>
        </div>

        <div class="booktalk-card author-card">
            <h3>About the Author</h3>
            <div class="value">${bt.author.name}</div>
            <p class="author-bio">${bt.author.bio}</p>
        </div>

        <div class="booktalk-card characters-card">
            <h3>Main Characters</h3>
            ${bt.characters.map(c => `
                <div class="character">
                    <div class="character-name">${c.name}</div>
                    <div class="character-desc">${c.description}</div>
                </div>
            `).join('')}
        </div>

        <div class="booktalk-card">
            <h3>Setting & Plot</h3>
            <div class="value">${bt.settingAndPlot}</div>
        </div>

        <div class="booktalk-card passages-card">
            <h3>Interesting Passages</h3>
            ${bt.passages.map(p => `
                <div class="passage">
                    <div class="passage-quote">"${p.quote}"</div>
                    <div class="passage-explanation"><strong>What this means:</strong> ${p.explanation}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderEightyDays() {
    if (typeof eightyDaysData === 'undefined') {
        console.warn('80 Days data not loaded');
        return;
    }

    // Render Summary Sections
    const summaryGrid = document.getElementById('ed-summary-grid');
    summaryGrid.innerHTML = eightyDaysData.sections.map((section, index) => `
        <div class="content-card" onclick="openModal(eightyDaysData.sections, ${index})">
            <div class="content-card-image">
                <img src="${section.image || getPlaceholderImage(section.title)}"
                     alt="${section.title}"
                     onerror="this.src='${getPlaceholderImage(section.title)}'">
            </div>
            <div class="content-card-body">
                <h3>${section.title}</h3>
                <p>${truncate(section.summary, 120)}</p>
            </div>
        </div>
    `).join('');

    // Render Chapters
    const chaptersGrid = document.getElementById('ed-chapters-grid');
    chaptersGrid.innerHTML = eightyDaysData.chapters.map((chapter, index) => `
        <div class="chapter-card" onclick="openModal(eightyDaysData.chapters, ${index})">
            <div class="chapter-number">Chapter ${chapter.number}</div>
            <h4>${chapter.title}</h4>
        </div>
    `).join('');

    // Render Book Talk
    const booktalkGrid = document.getElementById('ed-booktalk-grid');
    const bt = eightyDaysData.bookTalk;

    booktalkGrid.innerHTML = `
        <div class="booktalk-card">
            <h3>Book Info</h3>
            <div class="value">
                <strong>${bt.title}</strong><br>
                First Published: ${bt.published}
            </div>
        </div>

        <div class="booktalk-card author-card">
            <h3>About the Author</h3>
            <div class="value">${bt.author.name}</div>
            <p class="author-bio">${bt.author.bio}</p>
        </div>

        <div class="booktalk-card characters-card">
            <h3>Main Characters</h3>
            ${bt.characters.map(c => `
                <div class="character">
                    <div class="character-name">${c.name}</div>
                    <div class="character-desc">${c.description}</div>
                </div>
            `).join('')}
        </div>

        <div class="booktalk-card">
            <h3>Setting & Plot</h3>
            <div class="value">${bt.settingAndPlot}</div>
        </div>

        <div class="booktalk-card passages-card">
            <h3>Interesting Passages</h3>
            ${bt.passages.map(p => `
                <div class="passage">
                    <div class="passage-quote">"${p.quote}"</div>
                    <div class="passage-explanation"><strong>What this means:</strong> ${p.explanation}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// ==========================================
// STUDY QUESTIONS
// ==========================================

function renderStudyQuestions() {
    if (!christmasCarolData.studyQuestions) return;

    const container = document.getElementById('cc-questions-grid');
    const staveData = christmasCarolData.studyQuestions[currentStave];

    // Get available staves
    const availableStaves = Object.keys(christmasCarolData.studyQuestions);

    container.innerHTML = `
        <div class="stave-tabs">
            ${availableStaves.map(stave => `
                <button class="stave-tab-btn ${stave === currentStave ? 'active' : ''}" onclick="switchStave('${stave}')">
                    ${stave === 'stave2' ? 'Stave 2' : 'Stave 3'}
                </button>
            `).join('')}
        </div>
        <div class="questions-header">
            <h2>${staveData.title}</h2>
            <p>Click each question to reveal the answer</p>
        </div>
        ${staveData.questions.map((q, index) => `
            <div class="question-card" id="question-${index}">
                <div class="question-header" onclick="toggleQuestion(${index})">
                    <div class="question-number">${index + 1}</div>
                    <div class="question-text">${q.question}</div>
                    <div class="question-toggle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </div>
                </div>
                <div class="answer-panel">
                    <div class="answer-label">Answer</div>
                    <div class="answer-text">${q.answer}</div>
                </div>
            </div>
        `).join('')}
    `;
}

function switchStave(stave) {
    currentStave = stave;
    renderStudyQuestions();
}

function toggleQuestion(index) {
    const card = document.getElementById(`question-${index}`);
    card.classList.toggle('expanded');
}

// ==========================================
// UTILITIES
// ==========================================

function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

function getPlaceholderImage(title) {
    const colors = ['#dc2626', '#1d4ed8', '#059669', '#d97706', '#7c3aed'];
    const color = colors[Math.abs(hashCode(title)) % colors.length];
    const text = encodeURIComponent(title.substring(0, 30));
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="${encodeURIComponent(color)}" width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="white" font-size="18" font-family="Arial">${text}</text></svg>`;
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return hash;
}

// ==========================================
// STATE PERSISTENCE
// ==========================================

function saveState() {
    try {
        localStorage.setItem('bookSummaryState', JSON.stringify({
            book: currentBook,
            section: currentSection
        }));
    } catch (e) {
        // localStorage not available
    }
}

function restoreState() {
    try {
        const state = JSON.parse(localStorage.getItem('bookSummaryState'));
        if (state && state.book) {
            showBook(state.book);
            if (state.section) {
                const prefix = state.book === 'eighty-days' ? 'ed' : 'cc';
                showSection(prefix, state.section);
            }
        }
    } catch (e) {
        // No saved state or error
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderChristmasCarol();
    renderEightyDays();

    // Uncomment to restore last viewed state:
    // restoreState();
});
