# VesselNews — Maritime Regulatory News & Study Center

A full-stack progressive web app (PWA) dashboard and backend scraper system designed for reviewing, studying, and staying current with maritime industry regulations, port state control (PSC) updates, and maritime news.

## Overview

VesselNews aggregates regulatory updates and news from major maritime organizations worldwide. It features a **Node.js/Express backend** that automatically scrapes data from various maritime authorities and stores them in a local **SQLite** database. The **frontend PWA** presents these updates in an interactive, study-friendly interface with flashcards, quizzes, and a regulatory timeline, fully capable of offline use at sea.

## Key Features

### Backend & Data Pipeline
- **Automated Web Scraping** — Custom scraping engine to pull updates from major maritime organizations and MoUs.
- **Scheduled Synchronization** — Automated daily database updates using `node-cron`.
- **SQLite Database** — Lightweight, persistent local storage for scraped maritime articles.
- **RESTful API** — Express-based endpoints to serve data to the frontend client.

### Frontend Dashboard & Study Tools
- **PWA & Offline Capability** — Fully installable Progressive Web App with Service Worker caching, enabling seafarers to read news and study without an active internet connection.
- **News Board & Data Integration** — Filterable grid of regulatory summaries combining live scraped data from the backend with supplementary local mock data. Features Large, Compact, and List view modes.
- **Source Filtering & Enhanced Search** — Filter by organizations, categories, and impact levels. Includes forgiving fuzzy search with text highlighting.
- **Details Drawer & Web Share** — Full regulation summary with key compliance takeaways, dates, and official source links. Includes native Web Share API support to easily share updates with crewmates.
- **Regulatory Timeline** — Visual chronological view of upcoming enforcement dates.
- **Study Deck** — Interactive flashcards (with keyboard navigation) and multiple-choice quizzes (with progress tracking) based on regulatory data.
- **Targeted Study Mode** — Filter your study deck to generate quizzes and flashcards exclusively from your bookmarked articles.
- **Bookmarks** — Save articles for offline review and focused revision.
- **Dark / Light Mode** — Theme toggle with localStorage persistence.
- **Critical Alerts Ticker** — Scrolling banner highlighting high-impact regulatory deadlines.

## Sources Covered

**Live Scraped Sources (Backend):**
- International Maritime Organization (IMO)
- US Coast Guard (USCG)
- Paris MoU
- Tokyo MoU
- Black Sea MoU
- Riyadh MoU
- Indian Ocean MoU
- Mediterranean MoU
- Caribbean MoU
- Abuja MoU
- Viña del Mar MoU

**Additional Organizations (Frontend Mock Data):**
- Classification Societies (DNV, Lloyd's Register, ABS)
- Industry Associations & P&I (BIMCO, ICS, ILO)
- Flag Administrations (Singapore MPA, Malta Transport, Hong Kong MARDEP, Panama AMP)

## Tech Stack

**Backend**
- **Node.js & Express** — REST API and server logic
- **SQLite3** — Database management
- **Cheerio & Axios** — HTML parsing and web scraping
- **Node-Cron** — Task scheduling

**Frontend**
- **HTML5** — Semantic structure
- **Vanilla CSS** — HSL-based theming, glassmorphism, CSS Grid, responsive design, and animations
- **Vanilla JavaScript** — State-driven SPA with no framework dependencies
- **Progressive Web App (PWA)** — Service Worker API and Manifest for offline caching

## Project Structure

```text
Maritime_News/
├── index.html        # Main SPA markup
├── index.css         # Full design system & responsive styles
├── app.js            # Frontend application logic, routing, rendering
├── data.js           # Supplementary mock regulatory data
├── manifest.json     # PWA Web App Manifest
├── sw.js             # Service Worker for offline asset caching
└── backend/
    ├── server.js     # Express server & API endpoints
    ├── scraper.js    # Scraping controller and job runner
    ├── db.js         # SQLite database initialization & models
    ├── maritime.db   # SQLite database file
    ├── scrapers/     # Individual scraping scripts for MoUs & Orgs
    ├── package.json  # Backend dependencies and scripts
    └── ...
```

## Getting Started

### 1. Setup the Backend
Navigate to the backend directory, install dependencies, and start the server. This will initialize the database and run an initial data scrape.

```bash
cd backend
npm install
npm start
```
*The backend will run on `http://localhost:3000`.*

### 2. Serve the Frontend
In a new terminal window, serve the root directory of the project.

```bash
# From the project root
npx -y http-server . -p 8080
```
*Open `http://localhost:8080` in your browser. The frontend will automatically fetch live data from the local backend API.*

## License

This project is for educational and demonstration purposes.
