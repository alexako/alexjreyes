# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run develop          # Dev server at localhost:8000
npm run develop-local    # Dev server exposed on 0.0.0.0:8000
npm run build            # Production static build (output: public/)
npm run serve            # Serve production build locally
npm run format           # Prettier format all src/**/*.{js,jsx}
```

No test suite exists — `npm test` just echoes a placeholder.

## Architecture

**Gatsby 5 static site** — personal portfolio with an interactive terminal. React 18 + GraphQL (Gatsby's data layer) + SCSS.

**Data flow for projects**: Markdown files in `src/pages/projects/` → `gatsby-transformer-remark` → GraphQL → `portfolio.js` component. `gatsby-node.js` dynamically generates individual project pages and tag filter pages at build time from these markdown files.

**Key components:**
- `src/components/terminal.js` — ~600-line interactive terminal emulator. Handles real commands (`help`, `ls`, `cat`, `about`, `skills`, `projects`, `contact`) and fake commands (`ping`, `wget`, `curl`, `htop`) with realistic-looking output. Delegates personality responses to `SarcasticTerminal`.
- `src/utils/SarcasticTerminal.js` — Mood system with 4 levels driven by an annoyance score (0–100). Tracks command history for spam detection, typo recognition, and anti-repetition. Annoyance decays over time.
- `src/config/terminal-responses.js` — Library of 150+ unique responses organized by mood level and command category.
- `src/components/portfolio/portfolio.js` — Project listing with category + tag filtering via GraphQL queries.

**Shared enums** (`src/shared/`): `categories.enum.js` and `tags.enum.js` define the project categorization and tech tag systems used across portfolio filtering.

**⚠️ Tag sync gotcha**: `gatsby-node.js` uses CommonJS and cannot import from `tags.enum.js`. It maintains its own duplicate Tags object. When adding a new tag to `tags.enum.js`, you **must** also add it to the Tags object at the top of `gatsby-node.js`, otherwise the tag filter page won't be generated and clicking the tag will 404.

**Styling**: Per-component SCSS files in `src/components/styles/`, using mixins and extensions.

**Hosting**: Firebase Hosting. CI/CD via `.github/workflows/` — deploys on merge to main, preview deploys on PRs. Uses `--legacy-peer-deps` for install due to peer dep conflicts.
