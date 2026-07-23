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
    pscGrid: document.getElementById("psc-grid-container"),
    flagsGrid: document.getElementById("flags-grid-container"),
    classGrid: document.getElementById("class-grid-container"),
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
    statMediumImpact: document.getElementById("stat-medium-impact"),
    statLowImpact: document.getElementById("stat-low-impact"),
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
    drawerSourceLink: document.getElementById("drawer-source-link"),
    drawerSourceLinkText: document.getElementById("drawer-source-link-text")
  };

  // --- INITIALIZATION ---
  async function init() {
    loadSavedArticles();
    loadThemePreference();
    setupEventListeners();
    
    // Fetch real data from backend
    try {
      const res = await fetch('http://localhost:3000/api/news');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          // Retain mock data for Classes, Flags, and Orgs not scraped by backend
          const retainedMockData = window.MARITIME_DATA.filter(item => {
            const isFlag = ["Singapore MPA", "Malta Transport", "Hong Kong MARDEP", "Panama AMP"].includes(item.source);
            const isClass = ["DNV", "Lloyd's Register", "ABS"].includes(item.source);
            const isOrg = ["ILO", "BIMCO", "ICS"].includes(item.source); // Retain orgs except IMO
            return isFlag || isClass || isOrg;
          });
          window.MARITIME_DATA = [...retainedMockData, ...data];
        }
      }
    } catch (err) {
      console.warn("Backend not reachable. Using local mock data.", err);
    }
    
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
    
    // Handle responsive filter dropdowns
    function handleFiltersResize() {
      const dropdowns = document.querySelectorAll('.filter-dropdown');
      if (window.innerWidth <= 768) {
        dropdowns.forEach(d => d.removeAttribute('open'));
      } else {
        dropdowns.forEach(d => d.setAttribute('open', ''));
      }
    }
    window.addEventListener('resize', handleFiltersResize);
    handleFiltersResize();

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

  // --- UPDATE NEWS SIMULATION (NOW REAL API CALL) ---
  async function triggerNewsParsing() {
    const btn = DOM.btnUpdateNews;
    if (!btn) return;
    const icon = btn.querySelector("i");
    const text = btn.querySelector("span");
    
    btn.disabled = true;
    if (icon) icon.classList.add("spinning");
    if (text) text.innerText = "Scraping Portals...";
    
    showToast("Scraping Portals", "Connecting to Maritime sources and parsing latest updates...", "info");
    
    try {
      const res = await fetch('http://localhost:3000/api/scrape', { method: 'POST' });
      if (!res.ok) throw new Error("Scrape failed");
      const resJson = await res.json();
      
      showToast("Scraping active", "Extracting news articles...", "info");
      
      // Wait for 3 seconds to let backend process the PoC scrape
      setTimeout(async () => {
        try {
          const fetchRes = await fetch('http://localhost:3000/api/news');
          if (fetchRes.ok) {
            const newData = await fetchRes.json();
            const retainedMockData = window.MARITIME_DATA.filter(item => {
              const isFlag = ["Singapore MPA", "Malta Transport", "Hong Kong MARDEP", "Panama AMP"].includes(item.source);
              const isClass = ["DNV", "Lloyd's Register", "ABS"].includes(item.source);
              const isOrg = ["ILO", "BIMCO", "ICS"].includes(item.source);
              return isFlag || isClass || isOrg;
            });
            window.MARITIME_DATA = [...retainedMockData, ...newData];
            
            showToast("Update Complete", "Successfully fetched latest maritime news.", "success");
            
            // Show any errors from specific scrapers
            if (resJson.results && resJson.results.errors && resJson.results.errors.length > 0) {
              resJson.results.errors.forEach(err => {
                showToast(`${err.source} Failed`, err.error, "error");
              });
            }
            updateStats();
            buildNewsTicker();
            
            if (state.currentView === "news") {
              renderNewsGrid();
            } else if (state.currentView === "psc") {
              renderPscGrid();
            } else if (state.currentView === "flags") {
              renderFlagsGrid();
            } else if (state.currentView === "class") {
              renderClassGrid();
            } else if (state.currentView === "bookmarks") {
              renderBookmarksGrid();
            } else if (state.currentView === "timeline") {
              renderTimeline();
            }
          }
        } catch (e) {
          showToast("Error", "Failed to fetch updated news", "error");
        } finally {
          if (icon) icon.classList.remove("spinning");
          btn.disabled = false;
          if (text) text.innerText = "Update News";
          if (DOM.lastUpdateTime) {
            DOM.lastUpdateTime.innerText = `Last checked: ${formatDate(new Date())}`;
          }
        }
      }, 3000);
      
    } catch (err) {
      console.error(err);
      showToast("Error", "Backend scrape request failed. Is the server running?", "error");
      if (icon) icon.classList.remove("spinning");
      btn.disabled = false;
      if (text) text.innerText = "Update News";
    }
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
    } else if (state.currentView === "psc") {
      renderPscGrid();
    } else if (state.currentView === "flags") {
      renderFlagsGrid();
    } else if (state.currentView === "class") {
      renderClassGrid();
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
    if (DOM.statMediumImpact) {
      const mediumCount = window.MARITIME_DATA.filter(a => a.impact === "Medium").length;
      DOM.statMediumImpact.innerText = mediumCount;
    }
    if (DOM.statLowImpact) {
      const lowCount = window.MARITIME_DATA.filter(a => a.impact === "Low").length;
      DOM.statLowImpact.innerText = lowCount;
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
        } else if (state.currentView === "psc") {
          renderPscGrid();
        } else if (state.currentView === "flags") {
          renderFlagsGrid();
        } else if (state.currentView === "class") {
          renderClassGrid();
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
    if (DOM.pscGrid) DOM.pscGrid.addEventListener("click", handleGridClick);
    if (DOM.flagsGrid) DOM.flagsGrid.addEventListener("click", handleGridClick);
    if (DOM.classGrid) DOM.classGrid.addEventListener("click", handleGridClick);
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
          } else if (state.currentView === "psc") {
            renderPscGrid();
          } else if (state.currentView === "flags") {
            renderFlagsGrid();
          } else if (state.currentView === "class") {
            renderClassGrid();
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
        if (state.currentView === "news") renderNewsGrid();
        else if (state.currentView === "psc") renderPscGrid();
        else if (state.currentView === "flags") renderFlagsGrid();
        else if (state.currentView === "class") renderClassGrid();
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
    } else if (viewName === "psc") {
      DOM.viewTitle.innerText = "Port State Control (PSC)";
      DOM.viewSubtitle.innerText = "Updates and regulations from various MoUs and PSC authorities";
      renderPscGrid();
    } else if (viewName === "flags") {
      DOM.viewTitle.innerText = "Flag Administrations";
      DOM.viewSubtitle.innerText = "Directives and circulars from Flag States";
      renderFlagsGrid();
    } else if (viewName === "class") {
      DOM.viewTitle.innerText = "Classification Societies";
      DOM.viewSubtitle.innerText = "Rules, technical updates, and guidance from Class Societies";
      renderClassGrid();
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
    const pscSources = [
      "Paris MoU", "Tokyo MoU", "USCG", "Black Sea MoU", 
      "Riyadh MoU", "Indian Ocean MoU", "Mediterranean MoU", 
      "Caribbean MoU", "Abuja MoU", "Acuerdo de Viña del Mar", "EMSA"
    ];

    const flagSources = [
      "Singapore MPA", "Malta Transport", "Hong Kong MARDEP", "Panama AMP"
    ];

    const classSources = [
      "DNV", "Lloyd's Register", "ABS"
    ];

    return window.MARITIME_DATA.filter(item => {
      const isPsc = pscSources.includes(item.source);
      const isFlag = flagSources.includes(item.source);
      const isClass = classSources.includes(item.source);
      
      // Separate News, PSC, Flags, and Class
      if (state.currentView === "news" && (isPsc || isFlag || isClass)) return false;
      if (state.currentView === "psc" && !isPsc) return false;
      if (state.currentView === "flags" && !isFlag) return false;
      if (state.currentView === "class" && !isClass) return false;

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
    
    // For the card snippet, use fullText and slice it so it doesn't break layout
    let rawText = item.fullText || item.summary || 'No text available';
    let displaySummary = escapeHtml(rawText.length > 200 ? rawText.substring(0, 200) + '...' : rawText);
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

  // --- RENDER PSC GRID ---
  function renderPscGrid() {
    if (!DOM.pscGrid) return;
    
    const filtered = getFilteredNews();
    
    DOM.pscGrid.className = `news-grid size-${state.cardSize}`;
    
    if (filtered.length === 0) {
      DOM.pscGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 2rem auto;">
          <div class="empty-icon"><i class="fa-solid fa-anchor"></i></div>
          <h3 class="empty-title">No PSC Updates Found</h3>
          <p class="empty-desc">No Port State Control updates match your search criteria.</p>
        </div>
      `;
      return;
    }

    DOM.pscGrid.innerHTML = filtered.map((item, index) => cardTemplate(item, {
      isSaved: state.savedArticles.includes(item.id),
      learnMoreLabel: "Read Summary",
      bookmarkLabel: "Save Article",
      index: index
    })).join("");
  }

  // --- RENDER FLAGS GRID ---
  function renderFlagsGrid() {
    if (!DOM.flagsGrid) return;
    
    const filtered = getFilteredNews();
    
    DOM.flagsGrid.className = `news-grid size-${state.cardSize}`;
    
    if (filtered.length === 0) {
      DOM.flagsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 2rem auto;">
          <div class="empty-icon"><i class="fa-solid fa-flag"></i></div>
          <h3 class="empty-title">No Flag State Updates Found</h3>
          <p class="empty-desc">No Flag Administration updates match your search criteria.</p>
        </div>
      `;
      return;
    }

    DOM.flagsGrid.innerHTML = filtered.map((item, index) => cardTemplate(item, {
      isSaved: state.savedArticles.includes(item.id),
      learnMoreLabel: "Read Summary",
      bookmarkLabel: "Save Article",
      index: index
    })).join("");
  }

  // --- RENDER CLASS GRID ---
  function renderClassGrid() {
    if (!DOM.classGrid) return;
    
    const filtered = getFilteredNews();
    
    DOM.classGrid.className = `news-grid size-${state.cardSize}`;
    
    if (filtered.length === 0) {
      DOM.classGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; margin: 2rem auto;">
          <div class="empty-icon"><i class="fa-solid fa-certificate"></i></div>
          <h3 class="empty-title">No Class Society Updates Found</h3>
          <p class="empty-desc">No Classification Society updates match your search criteria.</p>
        </div>
      `;
      return;
    }

    DOM.classGrid.innerHTML = filtered.map((item, index) => cardTemplate(item, {
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
    
    DOM.drawerSummary.innerText = article.fullText || article.summary || 'No content available.';



    // Set source official website details
    if (DOM.drawerSourceLink && DOM.drawerSourceLinkText) {
      DOM.drawerSourceLink.href = article.sourceUrl || article.url || "#";
      DOM.drawerSourceLinkText.innerText = `${article.source} Official Reference (${article.convention || ''})`;
      
      if (!article.sourceUrl && !article.url) {
        DOM.drawerSourceLink.style.display = "none";
      } else {
        DOM.drawerSourceLink.style.display = "flex";
      }
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



  // --- BOOTSTRAP ---
  init();
});
