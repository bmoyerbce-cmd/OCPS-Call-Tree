/**
 * OCPS Agent Call Tree – app.js
 * Handles navigation, rendering, breadcrumbs, and search.
 */

/* ── State ────────────────────────────────────────────────── */
const state = {
  history: [CALL_TREE],   // stack of visited nodes
};

/* ── DOM Refs ─────────────────────────────────────────────── */
const stageEl          = document.getElementById('callTreeStage');
const stageTitleEl     = document.getElementById('stageTitle');
const stageSubtitleEl  = document.getElementById('stageSubtitle');
const optionsGridEl    = document.getElementById('optionsGrid');
const suboptionsPanel  = document.getElementById('suboptionsPanel');
const suboptionsInner  = document.getElementById('suboptionsInner');
const resultSection    = document.getElementById('resultSection');
const resultCard       = document.getElementById('resultCard');
const breadcrumbList   = document.getElementById('breadcrumbList');
const progressFill     = document.getElementById('progressBarFill');
const progressLabel    = document.getElementById('progressLabel');
const searchOverlay    = document.getElementById('searchOverlay');
const searchInput      = document.getElementById('searchInput');
const searchResults    = document.getElementById('searchResults');
const fabSearch        = document.getElementById('fabSearch');
const btnCloseSearch   = document.getElementById('btnCloseSearch');
const btnReset         = document.getElementById('btnReset');
const btnGoBack        = document.getElementById('btnGoBack');
const btnStartOver     = document.getElementById('btnStartOver');
const btnToggleCards   = document.getElementById('btnToggleCards');
const toggleLabel      = document.getElementById('toggleLabel');
const toggleChevron    = document.getElementById('toggleChevron');
const toggleCardsWrap  = document.getElementById('toggleCardsWrap');

// Track which card is currently showing its dropdown
let activeDropdownId = null;

// Track whether the cards grid is currently visible (default: hidden on home)
let cardsVisible = false;

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderStep();
  bindEvents();
});

/* ── Render current node ──────────────────────────────────── */
function renderStep() {
  const current = state.history[state.history.length - 1];

  // Hide result, show stage
  resultSection.classList.add('hidden');
  stageEl.classList.remove('hidden');

  // Hide dropdown whenever we re-render (navigating deeper)
  hideSuboptions();

  // Titles
  stageTitleEl.textContent  = current.label  || 'Select an option';
  stageSubtitleEl.textContent = current.subtitle || 'Choose the option that best matches the caller\'s question.';

  // Animate in
  stageEl.style.animation = 'none';
  requestAnimationFrame(() => {
    stageEl.style.animation = '';
  });

  // Build options
  optionsGridEl.innerHTML = '';
  const items = current.children || [];
  items.forEach((item) => {
    const card = buildOptionCard(item);
    optionsGridEl.appendChild(card);
  });

  // Show/hide the toggle button and cards grid based on depth
  const isRoot = state.history.length === 1;
  if (isRoot) {
    // On home screen: show toggle button, cards hidden by default
    toggleCardsWrap.classList.remove('hidden');
    cardsVisible = false;
    optionsGridEl.classList.add('cards-hidden');
    btnToggleCards.setAttribute('aria-expanded', 'false');
    toggleLabel.textContent = 'Show Categories';
  } else {
    // Deeper levels: hide toggle button, always show cards
    toggleCardsWrap.classList.add('hidden');
    cardsVisible = true;
    optionsGridEl.classList.remove('cards-hidden');
  }

  updateBreadcrumb();
  updateProgress();
}

/* ── Build an option card ─────────────────────────────────── */
function buildOptionCard(item) {
  const card = document.createElement('article');
  card.className = 'option-card';
  card.dataset.nodeId = item.id;
  card.style.setProperty('--card-accent',  item.accent   || 'var(--ocps-blue-mid)');
  card.style.setProperty('--icon-bg',      item.iconBg   || 'var(--ocps-blue-light)');
  card.style.setProperty('--icon-color',   item.iconColor|| 'var(--ocps-blue)');

  const isLeaf = !!item.result;
  const hasDropdown = !!(item.subOptions && item.subOptions.length);

  card.innerHTML = `
    <div class="option-icon"><i class="fas ${item.icon || 'fa-circle'}"></i></div>
    <div class="option-text">
      <span class="option-label">${item.label}</span>
      ${item.desc ? `<span class="option-desc">${item.desc}</span>` : ''}
    </div>
    <span class="option-arrow"><i class="fas ${isLeaf ? 'fa-check-circle' : hasDropdown ? 'fa-chevron-down' : 'fa-chevron-right'}"></i></span>
  `;

  if (hasDropdown) {
    // Show dropdown on hover (desktop) and click (all)
    card.addEventListener('mouseenter', () => showSuboptions(item, card));
    card.addEventListener('click', (e) => {
      if (activeDropdownId === item.id) {
        // Second click → navigate into the category
        hideSuboptions();
        handleOptionClick(item);
      } else {
        showSuboptions(item, card);
      }
    });
  } else {
    card.addEventListener('click', () => handleOptionClick(item));
  }
  return card;
}

/* ── Show sub-options dropdown ────────────────────────────── */
function showSuboptions(item, card) {
  activeDropdownId = item.id;

  // Highlight active card
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('card-active'));
  card.classList.add('card-active');

  // Build header
  const headerHtml = `
    <div class="suboptions-header">
      <div class="suboptions-header-left">
        <div class="suboptions-header-icon"><i class="fas ${item.icon || 'fa-list'}"></i></div>
        <span class="suboptions-header-title">${item.label}</span>
      </div>
      <span class="suboptions-header-hint">Click an option to go directly to that page ↓</span>
    </div>
  `;

  // Build sub-option items
  const itemsHtml = item.subOptions.map((opt, i) => `
    <a class="suboption-item" href="${opt.url}" target="_blank" rel="noopener">
      <span class="suboption-num">${i + 1}</span>
      <span class="suboption-text">
        <span class="suboption-label">${opt.label}</span>
        <span class="suboption-desc">${opt.desc}</span>
      </span>
      <span class="suboption-arrow"><i class="fas fa-external-link-alt"></i></span>
    </a>
  `).join('');

  suboptionsPanel.innerHTML = headerHtml + `<div class="suboptions-inner">${itemsHtml}</div>`;
  suboptionsPanel.classList.remove('hidden');

  // Scroll panel into view smoothly
  suboptionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ── Hide sub-options dropdown ────────────────────────────── */
function hideSuboptions() {
  activeDropdownId = null;
  suboptionsPanel.classList.add('hidden');
  suboptionsPanel.innerHTML = '';
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('card-active'));
}

/* ── Handle option click ──────────────────────────────────── */
function handleOptionClick(item) {
  if (item.result) {
    showResult(item);
  } else if (item.children) {
    state.history.push(item);
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ── Show department result ───────────────────────────────── */
function showResult(item) {
  // Update history
  state.history.push(item);
  updateBreadcrumb();
  updateProgress();

  stageEl.classList.add('hidden');
  resultSection.classList.remove('hidden');

  const r = item.result;

  // Build contacts HTML
  let contactsHtml = '';
  if (r.contacts && r.contacts.length > 0) {
    contactsHtml = `
      <h3 class="result-section-title">Contact Information</h3>
      <ul class="contact-list">
        ${r.contacts.map(c => {
          let icon = 'fa-phone';
          if (c.type === 'person')  icon = 'fa-user-tie';
          if (c.type === 'link')    icon = 'fa-external-link-alt';
          if (c.type === 'email')   icon = 'fa-envelope';

          let infoHtml = '';
          if (c.type === 'link' && c.url) {
            infoHtml = `<a href="${c.url}" target="_blank" rel="noopener" class="contact-info">${c.info}</a>`;
          } else {
            infoHtml = `<span class="contact-info">${c.info}</span>`;
          }

          return `
            <li class="contact-item">
              <span class="contact-icon"><i class="fas ${icon}"></i></span>
              <span class="contact-detail">
                <span class="contact-role">${c.role}</span>
                ${infoHtml}
              </span>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  // Tags
  let tagsHtml = '';
  if (r.tags && r.tags.length > 0) {
    tagsHtml = `
      <h3 class="result-section-title">Keywords</h3>
      <div class="tags-row">
        ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
  }

  // Related departments
  let relatedHtml = '';
  if (r.relatedDepts && r.relatedDepts.length > 0) {
    relatedHtml = `
      <h3 class="result-section-title" style="margin-top:1.25rem">See Also</h3>
      <div class="tags-row">
        ${r.relatedDepts.map(d => `<span class="tag" style="background:#f0f4f9;color:#374151;border:1px solid #e2e8f0;cursor:pointer" onclick="handleRelatedClick('${d.replace(/'/g, "\\'")}')">${d}</span>`).join('')}
      </div>
    `;
  }

  // Website link
  const primaryContact = r.contacts?.find(c => c.type === 'link');
  let websiteLinkHtml = '';
  if (primaryContact) {
    websiteLinkHtml = `
      <div style="margin-top:1.5rem">
        <a href="${primaryContact.url}" target="_blank" rel="noopener" class="result-link-btn">
          <i class="fas fa-external-link-alt"></i> Visit Department Page
        </a>
      </div>
    `;
  }

  resultCard.innerHTML = `
    <div class="result-header">
      <div class="result-dept-icon"><i class="fas ${item.icon || r.icon || 'fa-building'}"></i></div>
      <div>
        <div class="result-dept-tag">Route to</div>
        <div class="result-dept-name">${r.department}</div>
      </div>
    </div>
    <div class="result-body">
      <h3 class="result-section-title">Department Overview</h3>
      <p class="result-description">${r.description}</p>
      ${contactsHtml}
      ${tagsHtml}
      ${relatedHtml}
      ${websiteLinkHtml}
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animate
  resultSection.style.animation = 'none';
  requestAnimationFrame(() => { resultSection.style.animation = ''; });
}

/* ── Handle related dept click from result ────────────────── */
function handleRelatedClick(deptName) {
  // Search the index for a matching department name
  const match = SEARCH_INDEX.find(entry =>
    entry.node.result.department.toLowerCase().includes(deptName.toLowerCase()) ||
    deptName.toLowerCase().includes(entry.node.label.toLowerCase())
  );
  if (match) {
    // Navigate to that result from scratch
    state.history = [CALL_TREE, ...match.path.slice(1), match.node];
    showResult(match.node);
    updateBreadcrumb();
    updateProgress();
  }
}

/* ── Update breadcrumb ────────────────────────────────────── */
function updateBreadcrumb() {
  breadcrumbList.innerHTML = '';
  state.history.forEach((node, index) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb-item';

    const isLast = index === state.history.length - 1;
    if (isLast) {
      li.classList.add('active');
      li.textContent = index === 0 ? 'Home' : node.label;
    } else {
      li.classList.add('clickable');
      li.textContent = index === 0 ? 'Home' : node.label;
      li.addEventListener('click', () => navigateTo(index));
    }
    breadcrumbList.appendChild(li);
  });
}

/* ── Navigate to a specific history index ─────────────────── */
function navigateTo(index) {
  state.history = state.history.slice(0, index + 1);
  const current = state.history[state.history.length - 1];
  if (current.result) {
    // Shouldn't happen, but handle gracefully
    state.history.pop();
    renderStep();
  } else {
    renderStep();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Update progress bar ──────────────────────────────────── */
function updateProgress() {
  const maxDepth = 3; // typical tree depth
  const depth = state.history.length - 1;
  const pct = Math.min((depth / maxDepth) * 100, 100);
  progressFill.style.width = pct + '%';

  const currentNode = state.history[state.history.length - 1];
  if (currentNode.result) {
    progressLabel.textContent = 'Routed ✓';
    progressFill.style.background = 'linear-gradient(90deg, #1a7a4a, #34d399)';
  } else {
    progressLabel.textContent = `Step ${depth + 1}`;
    progressFill.style.background = 'linear-gradient(90deg, var(--ocps-blue-mid), var(--ocps-gold))';
  }
}

/* ── Reset / Go Back ──────────────────────────────────────── */
function resetTree() {
  state.history = [CALL_TREE];
  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (state.history.length > 1) {
    state.history.pop();
    const current = state.history[state.history.length - 1];
    if (current.result) {
      state.history.pop();
    }
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ── Search ───────────────────────────────────────────────── */
function openSearch() {
  searchOverlay.classList.remove('hidden');
  searchInput.value = '';
  renderSearchResults('');
  searchInput.focus();
}

function closeSearch() {
  searchOverlay.classList.add('hidden');
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  let matches;

  if (!q) {
    // Show all departments alphabetically
    matches = SEARCH_INDEX.slice().sort((a, b) =>
      a.node.result.department.localeCompare(b.node.result.department)
    );
  } else {
    matches = SEARCH_INDEX.filter(entry => {
      const r = entry.node.result;
      return (
        r.department.toLowerCase().includes(q) ||
        entry.node.label.toLowerCase().includes(q) ||
        (entry.node.desc  && entry.node.desc.toLowerCase().includes(q)) ||
        (r.tags && r.tags.some(t => t.toLowerCase().includes(q))) ||
        (r.description && r.description.toLowerCase().includes(q))
      );
    });
  }

  if (matches.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search" style="font-size:2rem;opacity:.3;display:block;margin-bottom:.5rem"></i>
        No departments match "<strong>${query}</strong>"
      </div>`;
    return;
  }

  searchResults.innerHTML = matches.map(entry => {
    const r = entry.node.result;
    const pathStr = entry.path.slice(1).map(n => n.label).join(' › ');
    return `
      <div class="search-result-item" data-id="${entry.node.id}">
        <div class="search-result-icon" style="background:${entry.node.iconBg||'var(--ocps-blue-light)'};color:${entry.node.iconColor||'var(--ocps-blue)'}">
          <i class="fas ${entry.node.icon || 'fa-building'}"></i>
        </div>
        <div class="search-result-text">
          <span class="search-result-name">${r.department}</span>
          <span class="search-result-path">${pathStr || 'Department Directory'}</span>
        </div>
        <span class="search-result-arrow"><i class="fas fa-chevron-right"></i></span>
      </div>
    `;
  }).join('');

  // Bind clicks
  searchResults.querySelectorAll('.search-result-item').forEach((el) => {
    el.addEventListener('click', () => {
      const nodeId = el.dataset.id;
      const entry  = SEARCH_INDEX.find(e => e.node.id === nodeId);
      if (entry) {
        closeSearch();
        // Build history path
        state.history = [CALL_TREE, ...entry.path.slice(1)];
        showResult(entry.node);
        updateBreadcrumb();
        updateProgress();
      }
    });
  });
}

/* ── Event Bindings ───────────────────────────────────────── */
function bindEvents() {
  btnReset.addEventListener('click', resetTree);
  btnGoBack.addEventListener('click', goBack);
  btnStartOver.addEventListener('click', resetTree);
  fabSearch.addEventListener('click', openSearch);
  btnCloseSearch.addEventListener('click', closeSearch);

  // Toggle cards visibility
  btnToggleCards.addEventListener('click', () => {
    cardsVisible = !cardsVisible;
    if (cardsVisible) {
      optionsGridEl.classList.remove('cards-hidden');
      btnToggleCards.setAttribute('aria-expanded', 'true');
      toggleLabel.textContent = 'Hide Categories';
      // Animate grid in
      optionsGridEl.style.animation = 'none';
      requestAnimationFrame(() => { optionsGridEl.style.animation = 'fadeSlideIn .25s ease both'; });
    } else {
      optionsGridEl.classList.add('cards-hidden');
      btnToggleCards.setAttribute('aria-expanded', 'false');
      toggleLabel.textContent = 'Show Categories';
      hideSuboptions();
    }
  });

  searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));

  // Close dropdown when clicking outside cards & dropdown
  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.option-card') &&
      !e.target.closest('.suboptions-panel')
    ) {
      hideSuboptions();
    }
  });

  // Close on overlay click
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  // Keyboard: Escape closes search or dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!searchOverlay.classList.contains('hidden')) {
        closeSearch();
      } else {
        hideSuboptions();
      }
    }
  });
}
