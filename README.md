# VesselNews — Maritime Regulatory News & Study Center

A single-page dashboard for reviewing, studying, and staying current with maritime industry regulations and news updates.

## Overview

VesselNews aggregates summarized regulatory updates from **17 major maritime organizations** and presents them in an interactive, study-friendly interface with flashcards, quizzes, and a regulatory timeline.

## Features

- **News Board** — Filterable grid of regulatory summaries with Large, Compact, and List view modes
- **Source Filtering** — Filter by 17 source organizations, 6 categories, and 3 impact levels
- **Details Drawer** — Full regulation summary with key compliance takeaways and official source links
- **Regulatory Timeline** — Visual chronological view of upcoming enforcement dates
- **Study Deck** — Interactive flashcards and multiple-choice quizzes drawn from all regulations
- **Bookmarks** — Save articles for offline review
- **Live Update Simulation** — Simulated multi-source parsing with toast notifications
- **Dark / Light Mode** — Theme toggle with localStorage persistence
- **Critical Alerts Ticker** — Scrolling banner highlighting high-impact regulatory deadlines

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
- **Vanilla CSS** — HSL-based theming, glassmorphism, CSS Grid, responsive design
- **Vanilla JavaScript** — State-driven SPA with no framework dependencies
- **Font Awesome 6** — Icon library
- **Google Fonts** — Inter + Outfit typefaces

## Project Structure

```
Maritime_News/
├── index.html    # Main SPA markup
├── index.css     # Full design system & responsive styles
├── app.js        # Application logic, routing, rendering
├── data.js       # Mock regulatory data & reserve update pool
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
