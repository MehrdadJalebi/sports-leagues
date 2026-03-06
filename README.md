# Sports Leagues SPA

## Overview

A small **Vue 3 Single Page Application** that displays sports leagues
using the **TheSportsDB API**.

Users can: - search leagues by name - filter leagues by sport - open a
league to view a season badge - share filtered results via URL
parameters

---

## Tech Stack

- Vue 3 (Composition API)
- Vite
- TypeScript
- Vue Router
- TanStack Vue Query
- VueUse
- CSS

---

## Features

### League List

Fetches leagues from:

https://www.thesportsdb.com/api/v1/json/3/all_leagues.php

Each card displays:

- League name (`strLeague`)
- Sport (`strSport`)
- Alternate name (`strLeagueAlternate`)

---

### Search

Users can filter leagues by typing in the search field.\
The search input is **debounced** to avoid unnecessary recalculations.

---

### Sport Filter

Leagues can be filtered by sport using a dropdown.

---

### URL Persistence

Search and sport filters are synced with URL query parameters.

Example:

/?search=premier&sport=Soccer

Benefits: - filters persist after refresh - filtered views can be shared
via URL

---

### Badge Modal

Clicking a league card opens a modal displaying a season badge.

Badge data is fetched from:

https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=`<id>`{=html}

Responses are cached to avoid repeated requests.

---

### UI States

The UI includes:

- loading skeleton
- empty state when no results match filters
- error state when API requests fail

---

## Architecture

### Components

- MainHeader
- FiltersBar
- LeagueList
- LeagueCard
- BadgeModal
- LeagueSkeleton
- EmptyState

### Composables

- `useLeagues` -- fetches league data
- `useLeagueFilters` -- manages search, sport filter and URL sync

### API Layer

API calls are separated into dedicated files and the API base URL is
centralized in a small config module.

---

## Design Decisions

### Vite instead of Webpack

Vite was used because it provides faster development startup and is the
modern default for Vue projects.

### No Vuex

Global state management was not necessary for this project.\
Server state is handled by **TanStack Vue Query** and UI state is
managed locally.

### Vue Query

Used for: - API caching - request lifecycle management - loading and
error states

---

## Accessibility

Basic accessibility improvements include:

- keyboard accessible cards
- cards usable with Enter / Space
- accessible form labels
- modal dialog semantics
- Escape key to close modal

---

## How to Run

Install dependencies:

```sh
npm install
```

Run development server:

```sh
npm run dev
```

Build project:

```sh
npm run build
```

Preview production build:

```sh
npm run preview
```

---

## AI Assistance

The assignment explicitly allowed AI assistance.

AI tools were used during development to:

- discuss stack choices
- review component architecture
- refine accessibility improvements
- validate filtering and URL synchronization logic
- improve loading and modal interaction states

All final code decisions and implementations were reviewed and adjusted manually.

---

## Trade-offs

Given the assignment scope, the focus was on:

- correct functionality
- maintainable architecture
- clear component separation
- responsive behavior
- clean API integration

More advanced features such as pagination, virtualization, UI libraries, or automated testing were intentionally not included.

---

## Possible Future Improvements

If extended further, potential improvements include:

- automated tests
- stronger modal focus trapping
- retry logic for failed requests
- advanced sorting or filtering
- virtualization for very large datasets
- refined UI animations

---

## Author

**Mehrdad Jalebi**
