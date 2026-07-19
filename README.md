# VesselNews — Maritime Regulatory News & Study Center

A progressive web app (PWA) dashboard for reviewing, studying, and staying current with maritime industry regulations and news updates, designed with offline capabilities for use at sea.

## Overview

VesselNews aggregates summarized regulatory updates from **17 major maritime organizations** and presents them in an interactive, study-friendly interface with flashcards, quizzes, and a regulatory timeline.

## Features

- **PWA & Offline Capability** — Fully installable Progressive Web App with Service Worker caching, enabling seafarers to read news and study without an active internet connection.
- **News Board** — Filterable grid of regulatory summaries with Large, Compact, and List view modes, featuring staggered entry animations.
- **Source Filtering & Enhanced Search** — Filter by 17 organizations, 6 categories, and 3 impact levels. Includes a forgiving fuzzy search with automatic text highlighting.
- **Details Drawer & Web Share** — Full regulation summary with key compliance takeaways and official source links. Includes native Web Share API support to easily share updates with crewmates.
- **Regulatory Timeline** — Visual chronological view of upcoming enforcement dates.
- **Study Deck** — Interactive flashcards (with keyboard navigation) and multiple-choice quizzes (with progress tracking).
- **Targeted Study Mode** — Filter your study deck to generate quizzes and flashcards exclusively from your bookmarked articles.
- **Bookmarks** — Save articles for offline review and focused revision.
- **Live Update Simulation** — Simulated multi-source parsing with toast notifications and glowing unread indicators for new articles.
- **Dark / Light Mode** — Theme toggle with localStorage persistence.
- **Critical Alerts Ticker** — Scrolling banner highlighting high-impact regulatory deadlines.

## Sources Covered

| Category | Organizations |
|---|---|
| International Bodies | IMO, ILO |
| Classification Societies | DNV, Lloyd's Register, ABS |
| Industry Associations & P&I | BIMCO, ICS, Gard P&I, UK P&I Club |
| Maritime Media | Safety4Sea, TradeWinds |
| Government / Port State | USCG, EMSA |
| Flag Administrations | Singapore MPA, Malta Transport, Hong Kong MARDEP, Panama AMP |

## Tech Stack

- **HTML5** — Semantic structure
- **Vanilla CSS** — HSL-based theming, glassmorphism, CSS Grid, responsive design, and animations
- **Vanilla JavaScript** — State-driven SPA with no framework dependencies
- **Progressive Web App (PWA)** — Service Worker API and Manifest for offline caching and installability
- **Font Awesome 6** — Icon library
- **Google Fonts** — Inter + Outfit typefaces

## Project Structure

```text
Maritime_News/
├── index.html    # Main SPA markup
├── index.css     # Full design system & responsive styles
├── app.js        # Application logic, routing, rendering
├── data.js       # Mock regulatory data & reserve update pool
├── manifest.json # PWA Web App Manifest
├── sw.js         # Service Worker for offline asset caching
└── README.md     # This file
```

## Getting Started

Open `index.html` directly in a browser — no build step or server required.

```bash
# Or serve locally
npx -y http-server . -p 8080
```

## License

This project is for educational and demonstration purposes.
