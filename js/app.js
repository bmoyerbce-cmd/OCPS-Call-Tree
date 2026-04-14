/**
 * OCPS Agent Call Tree - app.js
 * Handles navigation, rendering, breadcrumbs, and search.
 */

const state = {
  history: [CALL_TREE]
};

/* DOM Refs */
const stageEl = document.getElementById('callTreeStage');
const stageTitleEl = document.getElementById('stageTitle');
const stageSubtitleEl = document.getElementById('stageSubtitle');
const optionsGridEl = document.getElementById('optionsGrid');
const suboptionsPanel = document.getElementById('suboptionsPanel');
const resultSection = document.getElementById('resultSection');
const resultCard = document.getElementById('resultCard');
const breadcrumbList = document.getElementById('breadcrumbList');
const progressFill = document.getElementById('progressBarFill');
const progressLabel = document.getElementById('progressLabel');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const fabSearch = document.getElementById('fabSearch');
const btnCloseSearch = document.getElementById('btnCloseSearch');
const btnReset = document.getElementById('btnReset');
const btnGoBack = document.getElementById('btnGoBack');
const btnStartOver = document.getElementById('btnStartOver');
const btnToggleCards = document.getElementById('btnToggleCards');
const toggleLabel = document.getElementById('toggleLabel');
const toggleCardsWrap = document.getElementById('toggleCardsWrap');

let activeDropdownId = null;
let cardsVisible = false;

document.addEventListener('DOMContentLoaded', () => {
  renderStep();
  bindEvents();
  window.handleRelatedClick = handleRelatedClick;
});

function renderStep() {
  const current = state.history[state.history.length - 1];
  if (!current) return;

  if (resultSection) resultSection.classList.add('hidden');
  if (stageEl) stageEl.classList.remove('hidden');

  hideSuboptions();

  if (stageTitleEl) {
    stageTitleEl.textContent = current.label || 'Select an option';
  }

  if (stageSubtitleEl) {
    stageSubtitleEl.textContent =
      current.subtitle || "Choose the option that best matches the caller's question.";
  }

  if (stageEl) {
    stageEl.style.animation = 'none';
    requestAnimationFrame(() => {
      stageEl.style.animation = '';
    });
  }

  if (optionsGridEl) {
    optionsGridEl.innerHTML = '';
    const items = Array.isArray(current.children) ? current.children : [];
    items.forEach((item) => {
      optionsGridEl.appendChild(buildOptionCard(item));
    });
  }

  const isRoot = state.history.length === 1;

  if (isRoot) {
    if (toggleCardsWrap) toggleCardsWrap.classList.remove('hidden');
    cardsVisible = false;
    if (optionsGridEl) optionsGridEl.classList.add('cards-hidden');
    if (btnToggleCards) btnToggleCards.setAttribute('aria-expanded', 'false');
    if (toggleLabel) toggleLabel.textContent = 'Show Categories';
  } else {
    if (toggleCardsWrap) toggleCardsWrap.classList.add('hidden');
    cardsVisible = true;
    if (optionsGridEl) optionsGridEl.classList.remove('cards-hidden');
  }

  updateBreadcrumb();
  updateProgress();
}

function buildOptionCard(item) {
  const card = document.createElement('article');
  card.className = 'option-card';
  card.dataset.nodeId = item.id || '';
  card.style.setProperty('--card-accent', item.accent || 'var(--ocps-blue-mid)');
  card.style.setProperty('--icon-bg', item.iconBg || 'var(--ocps-blue-light)');
  card.style.setProperty('--icon-color', item.iconColor || 'var(--ocps-blue)');

  const isLeaf = Boolean(item.result);
  const hasDropdown = Boolean(item.subOptions && item.subOptions.length);

  card.innerHTML = `
    <div class="option-icon"><i class="fas ${item.icon || 'fa-circle'}"></i></div>
    <div class="option-text">
      <span class="option-label">${escapeHtml(item.label || '')}</span>
      ${item.desc ? `<span class="option-desc">${escapeHtml(item.desc)}</span>` : ''}
    </div>
    <span class="option-arrow">
      <i class="fas ${isLeaf ? 'fa-check-circle' : hasDropdown ? 'fa-chevron-down' : 'fa-chevron-right'}"></i>
    </span>
  `;

  if (hasDropdown) {
    card.addEventListener('mouseenter', () => showSuboptions(item, card));
    card.addEventListener('click', () => {
      if (activeDropdownId === item.id) {
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

function showSuboptions(item, card) {
  if (!suboptionsPanel) return;

  activeDropdownId = item.id;

  document.querySelectorAll('.option-card').forEach((c) => c.classList.remove('card-active'));
  if (card) card.classList.add('card-active');

  const headerHtml = `
    <div class="suboptions-header">
      <div class="suboptions-header-left">
        <div class="suboptions-header-icon"><i class="fas ${item.icon || 'fa-list'}"></i></div>
        <span class="suboptions-header-title">${escapeHtml(item.label || '')}</span>
      </div>
      <span class="suboptions-header-hint">Click an option to go directly to that page ↓</span>
    </div>
  `;

  const itemsHtml = (item.subOptions || [])
    .map(
      (opt, i) => `
        <a class="suboption-item" href="${escapeAttribute(opt.url || '#')}" target="_blank" rel="noopener">
          <span class="suboption-num">${i + 1}</span>
          <span class="suboption-text">
            <span class="suboption-label">${escapeHtml(opt.label || '')}</span>
            <span class="suboption-desc">${escapeHtml(opt.desc || '')}</span>
          </span>
          <span class="suboption-arrow"><i class="fas fa-external-link-alt"></i></span>
        </a>
      `
    )
    .join('');

  suboptionsPanel.innerHTML = `${headerHtml}<div class="suboptions-inner">${itemsHtml}</div>`;
  suboptionsPanel.classList.remove('hidden');
  suboptionsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideSuboptions() {
  activeDropdownId = null;

  if (suboptionsPanel) {
    suboptionsPanel.classList.add('hidden');
    suboptionsPanel.innerHTML = '';
  }

  document.querySelectorAll('.option-card').forEach((c) => c.classList.remove('card-active'));
}

function handleOptionClick(item) {
  if (item.result) {
    showResult(item);
  } else if (item.children) {
    state.history.push(item);
    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showResult(item, pushToHistory = true) {
  if (!item || !item.result) return;

  if (pushToHistory) {
    const current = state.history[state.history.length - 1];
    if (!current || current.id !== item.id) {
      state.history.push(item);
    }
  }

  updateBreadcrumb();
  updateProgress();

  if (stageEl) stageEl.classList.add('hidden');
  if (resultSection) resultSection.classList.remove('hidden');

  const r = item.result;

  let contactsHtml = '';
  if (Array.isArray(r.contacts) && r.contacts.length > 0) {
    contactsHtml = `
      <h3 class="result-section-title">Contact Information</h3>
      <ul class="contact-list">
        ${r.contacts
          .map((c) => {
            let icon = 'fa-phone';
            if (c.type === 'person') icon = 'fa-user-tie';
            if (c.type === 'link') icon = 'fa-external-link-alt';
            if (c.type === 'email') icon = 'fa-envelope';
            if (c.type === 'fax') icon = 'fa-fax';

            let infoHtml = '';
            if (c.type === 'link' && c.url) {
              infoHtml = `<a href="${escapeAttribute(c.url)}" target="_blank" rel="noopener" class="contact-info">${escapeHtml(c.info || '')}</a>`;
            } else if (c.type === 'email' && c.info) {
              infoHtml = `<a href="mailto:${escapeAttribute(c.info)}" class="contact-info">${escapeHtml(c.info)}</a>`;
            } else {
              infoHtml = `<span class="contact-info">${escapeHtml(c.info || '')}</span>`;
            }

            return `
              <li class="contact-item">
                <span class="contact-icon"><i class="fas ${icon}"></i></span>
                <span class="contact-detail">
                  <span class="contact-role">${escapeHtml(c.role || '')}</span>
                  ${infoHtml}
                </span>
              </li>
            `;
          })
          .join('')}
      </ul>
    `;
  }

  let tagsHtml = '';
  if (Array.isArray(r.tags) && r.tags.length > 0) {
    tagsHtml = `
      <h3 class="result-section-title">Keywords</h3>
      <div class="tags-row">
        ${r.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    `;
  }

  let relatedHtml = '';
  if (Array.isArray(r.relatedDepts) && r.relatedDepts.length > 0) {
    relatedHtml = `
      <h3 class="result-section-title" style="margin-top:1.25rem">See Also</h3>
      <div class="tags-row">
        ${r.relatedDepts
          .map(
            (d) =>
              `<button type="button" class="tag related-tag" data-related-dept="${escapeAttribute(
                d
              )}" style="background:#f0f4f9;color:#374151;border:1px solid #e2e8f0;cursor:pointer">${escapeHtml(d)}</button>`
          )
          .join('')}
      </div>
    `;
  }

  const primaryContact = Array.isArray(r.contacts)
    ? r.contacts.find((c) => c.type === 'link' && c.url)
    : null;

  let websiteLinkHtml = '';
  if (primaryContact) {
    websiteLinkHtml = `
      <div style="margin-top:1.5rem">
        <a href="${escapeAttribute(primaryContact.url)}" target="_blank" rel="noopener" class="result-link-btn">
          <i class="fas fa-external-link-alt"></i> Visit Department Page
        </a>
      </div>
    `;
  }

  if (resultCard) {
    resultCard.innerHTML = `
      <div class="result-header">
        <div class="result-dept-icon"><i class="fas ${item.icon || r.icon || 'fa-building'}"></i></div>
        <div>
          <div class="result-dept-tag">Route to</div>
          <div class="result-dept-name">${escapeHtml(r.department || '')}</div>
        </div>
      </div>
      <div class="result-body">
        <h3 class="result-section-title">Department Overview</h3>
        <p class="result-description">${escapeHtml(r.description || '')}</p>
        ${contactsHtml}
        ${tagsHtml}
        ${relatedHtml}
        ${websiteLinkHtml}
      </div>
    `;

    resultCard.querySelectorAll('[data-related-dept]').forEach((btn) => {
      btn.addEventListener('click', () => handleRelatedClick(btn.dataset.relatedDept));
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (resultSection) {
    resultSection.style.animation = 'none';
    requestAnimationFrame(() => {
      resultSection.style.animation = '';
    });
  }
}

function handleRelatedClick(deptName) {
  if (!deptName) return;

  const match = SEARCH_INDEX.find(
    (entry) =>
      entry.node.result.department.toLowerCase().includes(deptName.toLowerCase()) ||
      deptName.toLowerCase().includes(entry.node.label.toLowerCase())
  );

  if (match) {
    state.history = [CALL_TREE, ...match.path.slice(1), match.node];
    showResult(match.node, false);
    updateBreadcrumb();
    updateProgress();
  }
}

function updateBreadcrumb() {
  if (!breadcrumbList) return;

  breadcrumbList.innerHTML = '';

  state.history.forEach((node, index) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb-item';

    const isLast = index === state.history.length - 1;
    li.textContent = index === 0 ? 'Home' : node.label;

    if (isLast) {
      li.classList.add('active');
    } else {
      li.classList.add('clickable');
      li.addEventListener('click', () => navigateTo(index));
    }

    breadcrumbList.appendChild(li);
  });
}

function navigateTo(index) {
  state.history = state.history.slice(0, index + 1);

  const current = state.history[state.history.length - 1];
  if (current && current.result) {
    state.history.pop();
  }

  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const maxDepth = 3;
  const depth = state.history.length - 1;
  const pct = Math.min((depth / maxDepth) * 100, 100);

  if (progressFill) {
    progressFill.style.width = `${pct}%`;
  }

  const currentNode = state.history[state.history.length - 1];
  if (!currentNode) return;

  if (currentNode.result) {
    if (progressLabel) progressLabel.textContent = 'Routed ✓';
    if (progressFill) {
      progressFill.style.background = 'linear-gradient(90deg, #1a7a4a, #34d399)';
    }
  } else {
    if (progressLabel) progressLabel.textContent = `Step ${depth + 1}`;
    if (progressFill) {
      progressFill.style.background =
        'linear-gradient(90deg, var(--ocps-blue-mid), var(--ocps-gold))';
    }
  }
}

function resetTree() {
  state.history = [CALL_TREE];
  renderStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  if (state.history.length > 1) {
    state.history.pop();

    const current = state.history[state.history.length - 1];
    if (current && current.result) {
      state.history.pop();
    }

    renderStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function openSearch() {
  if (!searchOverlay || !searchInput) return;

  searchOverlay.classList.remove('hidden');
  searchInput.value = '';
  renderSearchResults('');
  searchInput.focus();
}

function closeSearch() {
  if (searchOverlay) searchOverlay.classList.add('hidden');
}

function renderSearchResults(query) {
  if (!searchResults) return;

  const q = query.trim().toLowerCase();
  let matches;

  if (!q) {
    matches = SEARCH_INDEX.slice().sort((a, b) =>
      a.node.result.department.localeCompare(b.node.result.department)
    );
  } else {
    matches = SEARCH_INDEX.filter((entry) => {
      const r = entry.node.result;
      return (
        r.department.toLowerCase().includes(q) ||
        entry.node.label.toLowerCase().includes(q) ||
        (entry.node.desc && entry.node.desc.toLowerCase().includes(q)) ||
        (r.tags && r.tags.some((t) => t.toLowerCase().includes(q))) ||
        (r.description && r.description.toLowerCase().includes(q))
      );
    });
  }

  if (matches.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search" style="font-size:2rem;opacity:.3;display:block;margin-bottom:.5rem"></i>
        No departments match "<strong>${escapeHtml(query)}</strong>"
      </div>
    `;
    return;
  }

  searchResults.innerHTML = matches
    .map((entry) => {
      const r = entry.node.result;
      const pathStr = entry.path.slice(1).map((n) => n.label).join(' › ');

      return `
        <div class="search-result-item" data-id="${escapeAttribute(entry.node.id)}">
          <div class="search-result-icon" style="background:${entry.node.iconBg || 'var(--ocps-blue-light)'};color:${entry.node.iconColor || 'var(--ocps-blue)'}">
            <i class="fas ${entry.node.icon || 'fa-building'}"></i>
          </div>
          <div class="search-result-text">
            <span class="search-result-name">${escapeHtml(r.department)}</span>
            <span class="search-result-path">${escapeHtml(pathStr || 'Department Directory')}</span>
          </div>
          <span class="search-result-arrow"><i class="fas fa-chevron-right"></i></span>
        </div>
      `;
    })
    .join('');

  searchResults.querySelectorAll('.search-result-item').forEach((el) => {
    el.addEventListener('click', () => {
      const nodeId = el.dataset.id;
      const entry = SEARCH_INDEX.find((e) => e.node.id === nodeId);

      if (entry) {
        closeSearch();
        state.history = [CALL_TREE, ...entry.path.slice(1), entry.node];
        showResult(entry.node, false);
        updateBreadcrumb();
        updateProgress();
      }
    });
  });
}

function bindEvents() {
  if (btnReset) btnReset.addEventListener('click', resetTree);
  if (btnGoBack) btnGoBack.addEventListener('click', goBack);
  if (btnStartOver) btnStartOver.addEventListener('click', resetTree);
  if (fabSearch) {
    fabSearch.addEventListener('click', (e) => {
      e.stopPropagation();
      openSearch();
    });
  }
  if (btnCloseSearch) btnCloseSearch.addEventListener('click', closeSearch);

  if (btnToggleCards) {
    btnToggleCards.addEventListener('click', (e) => {
      e.stopPropagation();
      cardsVisible = !cardsVisible;

      if (cardsVisible) {
        if (optionsGridEl) optionsGridEl.classList.remove('cards-hidden');
        btnToggleCards.setAttribute('aria-expanded', 'true');
        if (toggleLabel) toggleLabel.textContent = 'Hide Categories';

        if (optionsGridEl) {
          optionsGridEl.style.animation = 'none';
          requestAnimationFrame(() => {
            optionsGridEl.style.animation = 'fadeSlideIn .25s ease both';
          });
        }
      } else {
        if (optionsGridEl) optionsGridEl.classList.add('cards-hidden');
        btnToggleCards.setAttribute('aria-expanded', 'false');
        if (toggleLabel) toggleLabel.textContent = 'Show Categories';
        hideSuboptions();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.option-card') &&
      !e.target.closest('.suboptions-panel') &&
      !e.target.closest('#btnToggleCards') &&
      !e.target.closest('#fabSearch') &&
      !e.target.closest('#searchOverlay')
    ) {
      hideSuboptions();
    }
  });

  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (searchOverlay && !searchOverlay.classList.contains('hidden')) {
        closeSearch();
      } else {
        hideSuboptions();
      }
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
