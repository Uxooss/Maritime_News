// app.js - Maritime News & Study Center Engine

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE ---
  const state = {
    currentView: "news",
    savedArticles: [],
    activeFilters: {
      source: "all",
      category: "all",
      impact: "all"
    },
    searchQuery: "",
    theme: "dark",
    cardSize: "big", // big, small, list
    
    // Flashcard State
    flashcards: [],
    currentFlashcardIndex: 0,
    
    // Quiz State
    quizQuestions: [],
    currentQuizIndex: 0,
    quizScore: 0,
    quizFinished: false
  };

  // --- DOM ELEMENTS ---
  const DOM = {
    html: document.documentElement,
    navItems: document.querySelectorAll(".nav-item"),
    viewPanels: document.querySelectorAll(".view-panel"),
    viewTitle: document.getElementById("view-title"),
    viewSubtitle: document.getElementById("view-subtitle"),
    
    // Filters & Search
    searchBar: document.getElementById("search-bar"),
    filterSource: document.getElementById("filter-source"),
    filterCategory: document.getElementById("filter-category"),
    filterImpact: document.getElementById("filter-impact"),
    filtersPanel: document.getElementById("filters-panel"),
    filtersOverlay: document.getElementById("filters-overlay"),
    filtersToggleBtn: document.getElementById("filters-toggle-btn"),
    filtersCloseBtn: document.getElementById("filters-close-btn"),
    
    // Grids
    newsGrid: document.getElementById("news-grid-container"),
    bookmarksGrid: document.getElementById("bookmarks-grid-container"),
    bookmarksEmptyState: document.getElementById("bookmarks-empty-state"),
    bookmarksBrowseBtn: document.getElementById("bookmarks-browse-btn"),
    
    // Timeline
    timelineContainer: document.getElementById("timeline-container"),
    
    // Ticker
    tickerScroll: document.getElementById("ticker-scroll-content"),
    
    // Stats
    statTotalUpdates: document.getElementById("stat-total-updates"),
    statHighImpact: document.getElementById("stat-high-impact"),
    statQuizQuestions: document.getElementById("stat-quiz-questions"),
    statSavedItems: document.getElementById("stat-saved-items"),
    
    // Sizing & Parsing Controllers
    layoutSelectors: document.getElementById("layout-selectors"),
    btnUpdateNews: document.getElementById("btn-update-news"),
    lastUpdateTime: document.getElementById("last-update-time"),
    toastContainer: document.getElementById("toast-container"),
    
    // Theme toggle
    mobileThemeToggle: document.getElementById("mobile-theme-toggle"),
    
    // Details Drawer
    drawerOverlay: document.getElementById("drawer-overlay"),
    closeDrawerBtn: document.getElementById("close-drawer-btn"),
    drawerBadges: document.getElementById("drawer-badges"),
    drawerTitle: document.getElementById("drawer-title"),
    drawerSource: document.getElementById("drawer-meta-source"),
    drawerConvention: document.getElementById("drawer-meta-convention"),
    drawerPublish: document.getElementById("drawer-meta-publish"),
    drawerEnforced: document.getElementById("drawer-meta-enforced"),
    drawerSummary: document.getElementById("drawer-summary-text"),
    drawerTakeaways: document.getElementById("drawer-takeaways-list"),
    studyShortcutPanel: document.getElementById("study-shortcut-panel"),
    studyShortcutBtn: document.getElementById("study-shortcut-btn"),
    drawerSourceLink: document.getElementById("drawer-source-link"),
    drawerSourceLinkText: document.getElementById("drawer-source-link-text"),
    
    // Flashcard DOM
    flashcardWrapper: document.getElementById("flashcard-wrapper"),
    flashcard: document.getElementById("flashcard"),
    flashcardCategory: document.getElementById("flashcard-category"),
    flashcardFrontText: document.getElementById("flashcard-front-text"),
    flashcardBackText: document.getElementById("flashcard-back-text"),
    prevFlashcardBtn: document.getElementById("prev-flashcard-btn"),
    nextFlashcardBtn: document.getElementById("next-flashcard-btn"),
    flashcardCounter: document.getElementById("flashcard-counter"),
    
    // Quiz DOM
    quizContainer: document.getElementById("quiz-container"),
    quizQuestionNum: document.getElementById("quiz-question-num"),
    quizScoreText: document.getElementById("quiz-score"),
    quizQuestionText: document.getElementById("quiz-question-text"),
    quizOptionsContainer: document.getElementById("quiz-options-container"),
    quizFeedback: document.getElementById("quiz-feedback"),
    quizFeedbackTitle: document.getElementById("quiz-feedback-title"),
    quizFeedbackText: document.getElementById("quiz-feedback-text"),
    quizNextBtn: document.getElementById("quiz-next-btn"),
    quizRestartBtn: document.getElementById("quiz-restart-btn")
  };

  // --- INITIALIZATION ---
  function init() {
    loadSavedArticles();
    loadThemePreference();
    setupEventListeners();
    extractFlashcards();
    extractQuizQuestions();
    updateStats();
    buildNewsTicker();
    
    // Set initial timestamp
    if (DOM.lastUpdateTime) {
      DOM.lastUpdateTime.innerText = `Last checked: ${formatDate(new Date())}`;
    }

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.error('SW error', err));
    }
    
    // Initial Render
    renderView();
  }

  // --- THEME MANAGEMENT ---
  function loadThemePreference() {
    const savedTheme = localStorage.getItem("vesselnews-theme") || "dark";
    state.theme = savedTheme;
    DOM.html.setAttribute("data-theme", savedTheme);
    updateThemeToggleIcon();
  }

  function toggleTheme() {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    state.theme = newTheme;
    DOM.html.setAttribute("data-theme", newTheme);
    localStorage.setItem("vesselnews-theme", newTheme);
    updateThemeToggleIcon();
  }

  function updateThemeToggleIcon() {
    if (DOM.mobileThemeToggle) {
      const icon = DOM.mobileThemeToggle.querySelector("i");
      if (icon) {
        // Show sun icon in dark mode (click to go light), moon in light mode (click to go dark)
        icon.className = state.theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
      DOM.mobileThemeToggle.title = state.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
  }

  // --- UTILITIES & TOAST SYSTEM ---
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function showToast(title, message, type = "info") {
    if (!DOM.toastContainer) return;
    
    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    let iconClass = "fa-solid fa-circle-info";
    if (type === "success") {
      iconClass = "fa-solid fa-circle-check";
    }
    
    toast.innerHTML = `
      <i class="toast-icon ${iconClass}"></i>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.classList.add('fade-out'); setTimeout(() => this.parentElement.remove(), 300);">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  }

  // --- UPDATE NEWS SIMULATION ---
  function triggerNewsParsing() {
    const btn = DOM.btnUpdateNews;
    if (!btn) return;
    const icon = btn.querySelector("i");
    const text = btn.querySelector("span");
    
    btn.disabled = true;
    if (icon) icon.classList.add("spinning");
    if (text) text.innerText = "Parsing Portals...";
    
    showToast("Parsing Portals", "Connecting to IMO, ILO, DNV, Lloyd's Register, ABS databases...", "info");
    
    setTimeout(() => {
      showToast("Scanning Sources", "Checking BIMCO, ICS, Gard P&I, UK P&I Club circulars...", "info");
    }, 500);

    setTimeout(() => {
      if (text) text.innerText = "Scanning Media...";
      showToast("Media & Flag States", "Fetching Safety4Sea, TradeWinds, Singapore MPA, Malta, HK MARDEP, Panama AMP...", "info");
    }, 1000);
    
    setTimeout(() => {
      if (text) text.innerText = "Summarizing Updates...";
      showToast("Running Summarizer", "Analyzing new maritime circulars & amendments...", "info");
    }, 1500);
    
    setTimeout(() => {
      if (icon) icon.classList.remove("spinning");
      btn.disabled = false;
      if (text) text.innerText = "Update News";
      
      const now = new Date();
      if (DOM.lastUpdateTime) {
        DOM.lastUpdateTime.innerText = `Last checked: ${formatDate(now)}`;
      }
      
      if (window.RESERVE_UPDATES && window.RESERVE_UPDATES.length > 0) {
        const newItem = window.RESERVE_UPDATES.shift();
        newItem.isNew = true; // Mark as unread
        window.MARITIME_DATA.unshift(newItem);
        
        showToast(
          "Update Complete", 
          `Discovered new regulation: "${escapeHtml(newItem.title)}". Added to News Board.`, 
          "success"
        );
        
        updateStats();
        extractFlashcards();
        extractQuizQuestions();
        buildNewsTicker();
        
        if (state.currentView === "news") {
          renderNewsGrid();
        } else if (state.currentView === "bookmarks") {
          renderBookmarksGrid();
        } else if (state.currentView === "timeline") {
          renderTimeline();
        }
      } else {
        showToast("Checked Successfully", "All 17 sources are up-to-date. No new circulars found.", "success");
      }
    }, 2200);
  }

  // --- LOCAL STORAGE ---
  function loadSavedArticles() {
    try {
      const saved = localStorage.getItem("vesselnews-saved");
      state.savedArticles = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse saved articles", e);
      state.savedArticles = [];
    }
  }

  function toggleBookmark(articleId, event) {
    if (event) event.stopPropagation();
    
    const idx = state.savedArticles.indexOf(articleId);
    if (idx === -1) {
      state.savedArticles.push(articleId);
    } else {
      state.savedArticles.splice(idx, 1);
    }
    localStorage.setItem("vesselnews-saved", JSON.stringify(state.savedArticles));
    
    updateStats();
    
    // Re-render appropriate grids
    if (state.currentView === "news") {
      renderNewsGrid();
    } else if (state.currentView === "bookmarks") {
      renderBookmarksGrid();
    }
  }

  // --- STATS & DATA AGGREGATION ---
  function updateStats() {
    if (DOM.statTotalUpdates) {
      DOM.statTotalUpdates.innerText = window.MARITIME_DATA.length;
    }
    if (DOM.statHighImpact) {
      const highCount = window.MARITIME_DATA.filter(a => a.impact === "High").length;
      DOM.statHighImpact.innerText = highCount;
    }
    if (DOM.statSavedItems) {
      DOM.statSavedItems.innerText = state.savedArticles.length;
    }
    if (DOM.statQuizQuestions) {
      let qCount = 0;
      window.MARITIME_DATA.forEach(a => {
        if (a.studyQuestions) qCount += a.studyQuestions.length;
      });
      DOM.statQuizQuestions.innerText = qCount;
    }
  }

  function extractFlashcards(onlyBookmarks = false) {
    let list = [];
    const sourceData = onlyBookmarks 
      ? window.MARITIME_DATA.filter(a => state.savedArticles.includes(a.id))
      : window.MARITIME_DATA;

    sourceData.forEach(article => {
      if (article.flashcards) {
        article.flashcards.forEach(fc => {
          list.push({
            ...fc,
            category: article.category,
            source: article.source,
            title: article.title,
            articleId: article.id
          });
        });
      }
    });
    state.flashcards = list;
    state.currentFlashcardIndex = 0;
  }

  function extractQuizQuestions(onlyBookmarks = false) {
    let list = [];
    const sourceData = onlyBookmarks 
      ? window.MARITIME_DATA.filter(a => state.savedArticles.includes(a.id))
      : window.MARITIME_DATA;

    sourceData.forEach(article => {
      if (article.studyQuestions) {
        article.studyQuestions.forEach(q => {
          list.push({
            ...q,
            articleId: article.id,
            articleTitle: article.title,
            category: article.category
          });
        });
      }
    });
    state.quizQuestions = list;
    state.currentQuizIndex = 0;
    state.quizScore = 0;
    state.quizFinished = false;
  }

  // --- MARQUEE TICKER ---
  function buildNewsTicker() {
    if (!DOM.tickerScroll) return;
    
    // Select high and medium impact news
    const tickerItems = window.MARITIME_DATA
      .filter(a => a.impact === "High" || a.impact === "Medium")
      .map(a => `
        <span class="ticker-item">
          <i class="fa-solid fa-circle-info" style="color: ${a.impact === 'High' ? 'var(--alert-high)' : 'var(--alert-medium)'}"></i> 
          <strong>[${escapeHtml(a.source)} ${escapeHtml(a.convention)}]</strong> ${escapeHtml(a.title)} 
          (Enforced: ${escapeHtml(a.implementationDate)})
        </span>
      `);
    
    // Duplicate items to ensure smooth continuous looping
    DOM.tickerScroll.innerHTML = [...tickerItems, ...tickerItems].join("");
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Navigation items
    DOM.navItems.forEach(item => {
      item.addEventListener("click", () => {
        const targetView = item.getAttribute("data-view");
        
        DOM.navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");
        
        switchView(targetView);
      });
    });

    // Theme toggler (Header button)
    if (DOM.mobileThemeToggle) {
      DOM.mobileThemeToggle.addEventListener("click", () => {
        toggleTheme();
      });
    }

    // Search bar input
    if (DOM.searchBar) {
      DOM.searchBar.addEventListener("input", (e) => {
        state.searchQuery = e.target.value.toLowerCase();
        if (state.currentView === "news") {
          renderNewsGrid();
        } else if (state.currentView === "bookmarks") {
          renderBookmarksGrid();
        } else if (state.currentView === "timeline") {
          renderTimeline();
        }
      });
    }

    // Filters
    setupFilterGroup(DOM.filterSource, "source");
    setupFilterGroup(DOM.filterCategory, "category");
    setupFilterGroup(DOM.filterImpact, "impact");

    // Delegated clicks for card grids (open drawer / toggle bookmark)
    if (DOM.newsGrid) DOM.newsGrid.addEventListener("click", handleGridClick);
    if (DOM.bookmarksGrid) DOM.bookmarksGrid.addEventListener("click", handleGridClick);
    if (DOM.timelineContainer) DOM.timelineContainer.addEventListener("click", handleGridClick);

    // Mobile filters panel: open, close, and backdrop dismiss
    if (DOM.filtersToggleBtn) {
      DOM.filtersToggleBtn.addEventListener("click", () => openFiltersPanel());
    }
    if (DOM.filtersCloseBtn) {
      DOM.filtersCloseBtn.addEventListener("click", () => closeFiltersPanel());
    }
    if (DOM.filtersOverlay) {
      DOM.filtersOverlay.addEventListener("click", () => closeFiltersPanel());
    }

    // Close & Share Details Drawer
    if (DOM.closeDrawerBtn) {
      DOM.closeDrawerBtn.addEventListener("click", closeDrawer);
    }
    const shareDrawerBtn = document.getElementById("share-drawer-btn");
    if (shareDrawerBtn) {
      shareDrawerBtn.addEventListener("click", async () => {
        const articleTitle = DOM.drawerTitle.innerText;
        const articleSummary = DOM.drawerSummary.innerText;
        if (navigator.share) {
          try {
            await navigator.share({
              title: articleTitle,
              text: articleSummary,
              url: window.location.href
            });
            showToast("Shared", "Article shared successfully.", "success");
          } catch (err) {
            console.error("Error sharing", err);
          }
        }
      });
    }

    if (DOM.drawerOverlay) {
      DOM.drawerOverlay.addEventListener("click", (e) => {
        if (e.target === DOM.drawerOverlay) {
          closeDrawer();
        }
      });
    }

    // Keypress bindings (Escape close modal)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDrawer();
        closeFiltersPanel();
      }
    });

    // Bookmarks Browse button redirect
    if (DOM.bookmarksBrowseBtn) {
      DOM.bookmarksBrowseBtn.addEventListener("click", () => {
        const newsNav = document.getElementById("nav-news");
        if (newsNav) newsNav.click();
      });
    }

    // Flashcard interactivity
    if (DOM.flashcardWrapper) {
      DOM.flashcardWrapper.addEventListener("click", () => {
        DOM.flashcard.classList.toggle("flipped");
      });
    }

    if (DOM.prevFlashcardBtn) {
      DOM.prevFlashcardBtn.addEventListener("click", () => {
        if (state.currentFlashcardIndex > 0) {
          state.currentFlashcardIndex--;
          DOM.flashcard.classList.remove("flipped");
          setTimeout(renderFlashcard, 150); // slight delay to allow reset flip
        }
      });
    }

    if (DOM.nextFlashcardBtn) {
      DOM.nextFlashcardBtn.addEventListener("click", () => {
        if (state.currentFlashcardIndex < state.flashcards.length - 1) {
          state.currentFlashcardIndex++;
          DOM.flashcard.classList.remove("flipped");
          setTimeout(renderFlashcard, 150);
        }
      });
    }

    // Flashcard Keyboard Navigation
    document.addEventListener("keydown", (e) => {
      if (state.currentView !== "study") return;
      if (e.key === "ArrowLeft" && state.currentFlashcardIndex > 0) {
        DOM.prevFlashcardBtn.click();
      } else if (e.key === "ArrowRight" && state.currentFlashcardIndex < state.flashcards.length - 1) {
        DOM.nextFlashcardBtn.click();
      } else if (e.key === " " && DOM.flashcard) {
        e.preventDefault();
        DOM.flashcard.classList.toggle("flipped");
      }
    });

    // Targeted Study Checkbox
    const quizTargetBookmarks = document.getElementById("quiz-target-bookmarks");
    if (quizTargetBookmarks) {
      quizTargetBookmarks.addEventListener("change", (e) => {
        extractFlashcards(e.target.checked);
        extractQuizQuestions(e.target.checked);
        renderFlashcard();
        renderQuizQuestion();
      });
    }

    // Quiz action buttons
    if (DOM.quizNextBtn) {
      DOM.quizNextBtn.addEventListener("click", () => {
        if (state.currentQuizIndex < state.quizQuestions.length - 1) {
          state.currentQuizIndex++;
          renderQuizQuestion();
        }
      });
    }

    if (DOM.quizRestartBtn) {
      DOM.quizRestartBtn.addEventListener("click", () => {
        state.currentQuizIndex = 0;
        state.quizScore = 0;
        state.quizFinished = false;
        renderQuizQuestion();
      });
    }

    // Modal Drawer 'Study Now' Shortcut
    if (DOM.studyShortcutBtn) {
      DOM.studyShortcutBtn.addEventListener("click", () => {
        const articleId = DOM.studyShortcutBtn.getAttribute("data-target-id");
        closeDrawer();
        
        // Find Study Tab
        const studyNav = document.getElementById("nav-study");
        if (studyNav) studyNav.click();
        
        // Filter quiz / flashcards to focus on this article specifically
        focusStudyOnArticle(articleId);
      });
    }

    // Card Layout Selectors
    if (DOM.layoutSelectors) {
      const tags = DOM.layoutSelectors.querySelectorAll(".filter-tag");
      tags.forEach(tag => {
        tag.addEventListener("click", () => {
          tags.forEach(t => t.classList.remove("active"));
          tag.classList.add("active");
          
          state.cardSize = tag.getAttribute("data-layout");
          if (state.currentView === "news") {
            renderNewsGrid();
          } else if (state.currentView === "bookmarks") {
            renderBookmarksGrid();
          }
        });
      });
    }

    // Update News Parsing Button
    if (DOM.btnUpdateNews) {
      DOM.btnUpdateNews.addEventListener("click", triggerNewsParsing);
    }
  }

  function setupFilterGroup(element, stateKey) {
    if (!element) return;
    const tags = element.querySelectorAll(".filter-tag");
    tags.forEach(tag => {
      tag.addEventListener("click", () => {
        tags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
        
        state.activeFilters[stateKey] = tag.getAttribute("data-filter");
        renderNewsGrid();
      });
    });
  }

  // --- VIEW ROUTING ---
  function switchView(viewName) {
    state.currentView = viewName;
    
    // Toggle active view panel
    DOM.viewPanels.forEach(panel => {
      panel.classList.remove("active");
      if (panel.id === `view-${viewName}`) {
        panel.classList.add("active");
      }
    });

    // Update Header Text and Elements based on view
    if (viewName === "news") {
      DOM.viewTitle.innerText = "Maritime News Board";
      DOM.viewSubtitle.innerText = "Summarized updates from major Maritime Organisations & Conventions";
      renderNewsGrid();
    } else if (viewName === "timeline") {
      DOM.viewTitle.innerText = "Regulatory Timeline";
      DOM.viewSubtitle.innerText = "Visual milestones of upcoming convention implementation dates";
      renderTimeline();
    } else if (viewName === "study") {
      DOM.viewTitle.innerText = "Review & Study Deck";
      DOM.viewSubtitle.innerText = "Interactive flashcards and quizzes based on international maritime regulations";
      // Reset full decks
      extractFlashcards();
      extractQuizQuestions();
      renderFlashcard();
      renderQuizQuestion();
    } else if (viewName === "bookmarks") {
      DOM.viewTitle.innerText = "Saved Study Pack";
      DOM.viewSubtitle.innerText = "Your bookmarked regulations and summaries for quick reference";
      renderBookmarksGrid();
    }
  }

  function renderView() {
    switchView(state.currentView);
  }

  // --- FILTERING LOGIC ---
  function getFilteredNews() {
    return window.MARITIME_DATA.filter(item => {
      // Source Filter
      if (state.activeFilters.source !== "all" && item.source !== state.activeFilters.source) {
        return false;
      }
      
      // Category Filter
      if (state.activeFilters.category !== "all" && item.category !== state.activeFilters.category) {
        return false;
      }
      
      // Impact Filter
      if (state.activeFilters.impact !== "all" && item.impact !== state.activeFilters.impact) {
        return false;
      }
      
      // Search Query (Fuzzy word match)
      if (state.searchQuery) {
        const textToSearch = [
          item.title,
          item.summary,
          item.convention,
          item.source,
          item.category,
          (item.keyTakeaways || []).join(" ")
        ].join(" ").toLowerCase();
        
        const searchTerms = state.searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 0);
        const matchesAll = searchTerms.every(term => textToSearch.includes(term));
        if (!matchesAll) return false;
      }
      
      return true;
    });
  }

  // --- SHARED CARD TEMPLATE ---
  // Renders one news card. `mode` controls only the copy/state differences
  // between the News Board and the Bookmarks view; the markup itself is
  // built in exactly one place instead of being duplicated per view/layout.
  function cardTemplate(item, { isSaved, learnMoreLabel, bookmarkLabel, index = 0 }) {
    // Generate highlighted title and summary if search matches
    let displayTitle = escapeHtml(item.title);
    let displaySummary = escapeHtml(item.summary);
    if (state.searchQuery) {
      const searchTerms = state.searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 0);
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, "gi");
        displayTitle = displayTitle.replace(regex, '<span class="search-highlight">$1</span>');
        displaySummary = displaySummary.replace(regex, '<span class="search-highlight">$1</span>');
      });
    }

    const unreadDot = item.isNew ? `<div class="unread-indicator" title="New Update"></div>` : "";

    const badges = `
      <div class="badge-container">
        <span class="badge badge-source">${escapeHtml(item.source)}</span>
        <span class="badge badge-category">${escapeHtml(item.category)}</span>
        <span class="badge badge-impact ${escapeHtml(item.impact.toLowerCase())}">${escapeHtml(item.impact)} Impact</span>
      </div>
    `;

    const bookmarkBtn = `
      <button class="bookmark-btn ${isSaved ? 'active' : ''}" 
              aria-label="${bookmarkLabel}" 
              data-action="toggle-bookmark" data-id="${escapeHtml(item.id)}">
        <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
      </button>
    `;

    const footer = `
      <div class="card-footer">
        <span class="footer-date">
          <i class="fa-regular fa-calendar"></i> Enforced: ${escapeHtml(item.implementationDate)}
        </span>
        ${state.cardSize === "list" ? bookmarkBtn : ""}
        <button class="learn-more-btn">
          ${learnMoreLabel} <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    `;

    if (state.cardSize === "list") {
      return `
        <div class="news-card" data-action="open-drawer" data-id="${escapeHtml(item.id)}" style="animation-delay: ${index * 0.05}s">
          ${unreadDot}
          <div class="card-content">
            ${badges}
            <h3 class="card-title" title="${escapeHtml(item.title)}">${displayTitle}</h3>
          </div>
          ${footer}
        </div>
      `;
    }

    return `
      <div class="news-card" data-action="open-drawer" data-id="${escapeHtml(item.id)}" style="animation-delay: ${index * 0.05}s">
        ${unreadDot}
        <div class="card-header">
          ${badges}
          ${bookmarkBtn}
        </div>
        <div class="card-content">
          <h3 class="card-title">${displayTitle}</h3>
          <p class="card-excerpt">${displaySummary}</p>
        </div>
        ${footer}
      </div>
    `;
  }

  // --- MOBILE FILTERS PANEL ---
  function openFiltersPanel() {
    if (!DOM.filtersPanel) return;
    DOM.filtersPanel.classList.add("active");
    DOM.filtersOverlay?.classList.add("active");
    document.body.classList.add("no-scroll");
    DOM.filtersToggleBtn?.setAttribute("aria-expanded", "true");
  }

  function closeFiltersPanel() {
    if (!DOM.filtersPanel) return;
    DOM.filtersPanel.classList.remove("active");
    DOM.filtersOverlay?.classList.remove("active");
    document.body.classList.remove("no-scroll");
    DOM.filtersToggleBtn?.setAttribute("aria-expanded", "false");
  }

  // Single delegated handler for any grid built from cardTemplate.
  // Replaces per-card inline onclick="" attributes.
  function handleGridClick(e) {
    const bookmarkBtn = e.target.closest('[data-action="toggle-bookmark"]');
    if (bookmarkBtn) {
      e.stopPropagation();
      toggleBookmark(bookmarkBtn.getAttribute("data-id"), e);
      return;
    }
    const card = e.target.closest('[data-action="open-drawer"]');
    if (card) {
      openDrawer(card.getAttribute("data-id"));
    }
  }

  // --- RENDER NEWS GRID ---
  function renderNewsGrid() {
    if (!DOM.newsGrid) return;
    
    const filtered = getFilteredNews();
    
    // Apply size classes to parent container
    DOM.newsGrid.className = `news-grid size-${state.cardSize}`;
    
    if (filtered.length === 0) {
      DOM.newsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 2rem auto;">
          <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3 class="empty-title">No Updates Found</h3>
          <p class="empty-desc">No maritime updates match your search criteria. Try modifying your filter settings or checking your spelling.</p>
        </div>
      `;
      return;
    }

    DOM.newsGrid.innerHTML = filtered.map((item, index) => cardTemplate(item, {
      isSaved: state.savedArticles.includes(item.id),
      learnMoreLabel: "Read Summary",
      bookmarkLabel: "Save Article",
      index: index
    })).join("");
  }

  // --- RENDER SAVED ARTICLES GRID ---
  function renderBookmarksGrid() {
    if (!DOM.bookmarksGrid) return;
    
    const saved = window.MARITIME_DATA.filter(item => state.savedArticles.includes(item.id));
    
    // Apply size classes to parent container
    DOM.bookmarksGrid.className = `news-grid size-${state.cardSize}`;
    
    if (saved.length === 0) {
      DOM.bookmarksGrid.style.display = "none";
      DOM.bookmarksEmptyState.style.display = "flex";
      return;
    }
    
    DOM.bookmarksGrid.style.display = "grid";
    DOM.bookmarksEmptyState.style.display = "none";

    DOM.bookmarksGrid.innerHTML = saved.map((item, index) => cardTemplate(item, {
      isSaved: true,
      learnMoreLabel: "Study Summary",
      bookmarkLabel: "Remove Save",
      index: index
    })).join("");
  }

  // --- RENDER TIMELINE ---
  function renderTimeline() {
    if (!DOM.timelineContainer) return;
    
    // Sort updates by implementation date ascending
    const sorted = [...window.MARITIME_DATA].sort((a, b) => {
      return new Date(a.implementationDate) - new Date(b.implementationDate);
    });

    const today = new Date();
    
    // Re-create starting timeline line element
    DOM.timelineContainer.innerHTML = `<div class="timeline-line"></div>`;
    
    sorted.forEach(item => {
      // Check query match if search is active
      if (state.searchQuery) {
        const titleMatch = item.title.toLowerCase().includes(state.searchQuery);
        const convMatch = item.convention.toLowerCase().includes(state.searchQuery);
        if (!titleMatch && !convMatch) return;
      }

      const implDate = new Date(item.implementationDate);
      const isPassed = implDate < today;
      
      const timelineItem = document.createElement("div");
      timelineItem.className = `timeline-item ${isPassed ? 'passed' : ''}`;
      
      timelineItem.innerHTML = `
        <div class="timeline-badge-date">${escapeHtml(formatTimelineDate(item.implementationDate))}</div>
        <div class="timeline-node" title="Status: ${isPassed ? 'Enforced' : 'Upcoming'}"></div>
        <div class="timeline-content" data-action="open-drawer" data-id="${escapeHtml(item.id)}">
          <div class="timeline-content-header">
            <span class="badge badge-source">${escapeHtml(item.source)}</span>
            <span class="badge badge-impact ${escapeHtml(item.impact.toLowerCase())}">${escapeHtml(item.impact)}</span>
          </div>
          <h4 class="timeline-title">${escapeHtml(item.title)}</h4>
          <p class="timeline-desc"><strong>Convention:</strong> ${escapeHtml(item.convention)} | <strong>Enforcement Date:</strong> ${escapeHtml(item.implementationDate)}</p>
        </div>
      `;
      
      DOM.timelineContainer.appendChild(timelineItem);
    });
  }

  function formatTimelineDate(dateStr) {
    const d = new Date(dateStr);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  // --- RENDER FLASHCARDS ---
  function renderFlashcard() {
    if (state.flashcards.length === 0) {
      DOM.flashcardFrontText.innerText = "No flashcards found.";
      DOM.flashcardBackText.innerText = "Check back later.";
      DOM.flashcardCounter.innerText = "0 / 0";
      return;
    }
    
    const fc = state.flashcards[state.currentFlashcardIndex];
    DOM.flashcardCategory.innerText = `${fc.source} - ${fc.category}`;
    DOM.flashcardFrontText.innerText = fc.front;
    DOM.flashcardBackText.innerText = fc.back;
    
    DOM.flashcardCounter.innerText = `${state.currentFlashcardIndex + 1} / ${state.flashcards.length}`;
    
    // Disable buttons if bounds reached
    DOM.prevFlashcardBtn.disabled = (state.currentFlashcardIndex === 0);
    DOM.nextFlashcardBtn.disabled = (state.currentFlashcardIndex === state.flashcards.length - 1);
  }

  // --- RENDER QUIZ ---
  function renderQuizQuestion() {
    if (state.quizQuestions.length === 0) {
      DOM.quizQuestionText.innerText = "No quiz questions available.";
      DOM.quizOptionsContainer.innerHTML = "";
      DOM.quizFeedback.style.display = "none";
      DOM.quizNextBtn.style.display = "none";
      DOM.quizRestartBtn.style.display = "none";
      DOM.quizScoreText.innerText = "";
      return;
    }

    if (state.quizFinished) {
      showQuizResults();
      return;
    }

    const q = state.quizQuestions[state.currentQuizIndex];
    DOM.quizQuestionNum.innerText = `Question ${state.currentQuizIndex + 1} of ${state.quizQuestions.length}`;
    DOM.quizScoreText.innerText = `Score: ${state.quizScore} / ${state.currentQuizIndex}`;
    DOM.quizQuestionText.innerText = q.question;
    
    // Update progress bar
    const progressFill = document.getElementById("quiz-progress-fill");
    if (progressFill) {
      const progressPercent = ((state.currentQuizIndex) / state.quizQuestions.length) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }
    
    // Clear feedback and actions
    DOM.quizFeedback.style.display = "none";
    DOM.quizNextBtn.style.display = "none";
    DOM.quizRestartBtn.style.display = "none";

    // Generate option buttons
    DOM.quizOptionsContainer.innerHTML = q.options.map((opt, index) => `
      <button class="quiz-option" data-idx="${index}">
        <span>${escapeHtml(opt)}</span>
        <i class="fa-regular fa-circle"></i>
      </button>
    `).join("");

    // Bind option click
    const optButtons = DOM.quizOptionsContainer.querySelectorAll(".quiz-option");
    optButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        selectQuizOption(parseInt(btn.getAttribute("data-idx")), optButtons, q);
      });
    });
  }

  function selectQuizOption(selectedIdx, buttons, question) {
    // Disable all options
    buttons.forEach(btn => btn.classList.add("disabled"));
    
    const correctIdx = question.answerIndex;
    const isCorrect = (selectedIdx === correctIdx);
    
    if (isCorrect) {
      state.quizScore++;
      buttons[selectedIdx].classList.add("correct");
      buttons[selectedIdx].querySelector("i").className = "fa-solid fa-circle-check";
      DOM.quizFeedbackTitle.innerText = "Correct! ✓";
      DOM.quizFeedbackTitle.style.color = "#10b981";
    } else {
      buttons[selectedIdx].classList.add("incorrect");
      buttons[selectedIdx].querySelector("i").className = "fa-solid fa-circle-xmark";
      buttons[correctIdx].classList.add("correct");
      buttons[correctIdx].querySelector("i").className = "fa-solid fa-circle-check";
      DOM.quizFeedbackTitle.innerText = "Incorrect ✗";
      DOM.quizFeedbackTitle.style.color = "#ef4444";
    }

    // Display Explanation Feedback
    DOM.quizFeedbackText.innerText = question.explanation;
    DOM.quizFeedback.style.display = "block";

    // Update score text in header
    DOM.quizScoreText.innerText = `Score: ${state.quizScore} / ${state.currentQuizIndex + 1}`;

    // Manage action buttons
    if (state.currentQuizIndex < state.quizQuestions.length - 1) {
      DOM.quizNextBtn.style.display = "block";
    } else {
      state.quizFinished = true;
      DOM.quizNextBtn.style.display = "none";
      // Show restart immediately or show results slide next
      const resultsBtn = document.createElement("button");
      resultsBtn.className = "quiz-next-btn";
      resultsBtn.innerText = "View Final Results";
      resultsBtn.style.display = "block";
      resultsBtn.onclick = () => {
        resultsBtn.remove();
        showQuizResults();
      };
      DOM.quizNextBtn.parentNode.insertBefore(resultsBtn, DOM.quizNextBtn);
    }
  }

  function showQuizResults() {
    DOM.quizQuestionNum.innerText = "Quiz Completed";
    DOM.quizScoreText.innerText = "";
    
    const percentage = Math.round((state.quizScore / state.quizQuestions.length) * 100);
    let gradeLabel = "Keep Studying!";
    let gradeColor = "var(--alert-medium)";
    
    if (percentage >= 85) {
      gradeLabel = "Master Mariner Status!";
      gradeColor = "#10b981";
    } else if (percentage >= 50) {
      gradeLabel = "Competent Officer!";
      gradeColor = "var(--accent-primary)";
    }
    
    DOM.quizQuestionText.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <i class="fa-solid fa-trophy" style="font-size: 3.5rem; color: ${gradeColor}; margin-bottom: 1rem;"></i>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem;">Your Score: ${percentage}%</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">You answered ${state.quizScore} out of ${state.quizQuestions.length} questions correctly.</p>
        <span style="display: inline-block; padding: 0.4rem 1rem; border-radius: 30px; font-weight: 700; color: #fff; background: ${gradeColor}; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">${gradeLabel}</span>
      </div>
    `;
    
    DOM.quizOptionsContainer.innerHTML = "";
    DOM.quizFeedback.style.display = "none";
    DOM.quizNextBtn.style.display = "none";
    DOM.quizRestartBtn.style.display = "block";
  }

  // --- DETAILS DRAWER ---
  function openDrawer(articleId) {
    const article = window.MARITIME_DATA.find(a => a.id === articleId);
    if (!article) return;
    
    // Mark as read if it was new
    if (article.isNew) {
      article.isNew = false;
      if (state.currentView === "news") renderNewsGrid();
    }

    // Badges
    DOM.drawerBadges.innerHTML = `
      <span class="badge badge-source">${escapeHtml(article.source)}</span>
      <span class="badge badge-category">${escapeHtml(article.category)}</span>
      <span class="badge badge-impact ${escapeHtml(article.impact.toLowerCase())}">${escapeHtml(article.impact)} Impact</span>
    `;

    DOM.drawerTitle.innerText = article.title;
    DOM.drawerSource.innerText = article.source;
    DOM.drawerConvention.innerText = article.convention;
    DOM.drawerPublish.innerText = article.publishDate;
    DOM.drawerEnforced.innerText = article.implementationDate;
    
    DOM.drawerSummary.innerText = article.summary;

    // Key takeaways
    DOM.drawerTakeaways.innerHTML = article.keyTakeaways.map(takeaway => `
      <li>${escapeHtml(takeaway)}</li>
    `).join("");

    // Hook Study shortcut button
    if (article.studyQuestions && article.studyQuestions.length > 0) {
      DOM.studyShortcutPanel.style.display = "flex";
      DOM.studyShortcutBtn.setAttribute("data-target-id", article.id);
    } else {
      DOM.studyShortcutPanel.style.display = "none";
    }

    // Set source official website details
    if (DOM.drawerSourceLink && DOM.drawerSourceLinkText) {
      DOM.drawerSourceLink.href = article.sourceUrl || "https://www.imo.org";
      DOM.drawerSourceLinkText.innerText = `${article.source} Official Reference (${article.convention || ''})`;
    }

    // Toggle drawer active classes
    DOM.drawerOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // disable background scrolling
    
    // Show share button if Web Share API is available
    const shareBtn = document.getElementById("share-drawer-btn");
    if (shareBtn) {
      shareBtn.style.display = navigator.share ? "flex" : "none";
    }
  }

  function closeDrawer() {
    if (DOM.drawerOverlay) {
      DOM.drawerOverlay.classList.remove("active");
    }
    document.body.style.overflow = ""; // enable background scrolling
  }

  // --- STUDY DECK TARGETED FILTER ---
  function focusStudyOnArticle(articleId) {
    const article = window.MARITIME_DATA.find(a => a.id === articleId);
    if (!article) return;

    // Filter flashcards specifically to this article
    if (article.flashcards && article.flashcards.length > 0) {
      state.flashcards = article.flashcards.map(fc => ({
        ...fc,
        category: article.category,
        source: article.source,
        title: article.title,
        articleId: article.id
      }));
      state.currentFlashcardIndex = 0;
      renderFlashcard();
    }

    // Filter quiz questions specifically to this article
    if (article.studyQuestions && article.studyQuestions.length > 0) {
      state.quizQuestions = article.studyQuestions.map(q => ({
        ...q,
        articleId: article.id,
        articleTitle: article.title,
        category: article.category
      }));
      state.currentQuizIndex = 0;
      state.quizScore = 0;
      state.quizFinished = false;
      renderQuizQuestion();
    }
  }

  // --- BOOTSTRAP ---
  init();
});
