# Tic Tac Toe — Ocean Professional (React)

A lightweight, modern Tic Tac Toe game built with React and vanilla CSS following the Ocean Professional theme.

## Features
- 3x3 grid with proper turn alternation (X / O)
- Winner and draw detection; moves are disabled after the game ends
- Reset (X starts) and New Game (alternates starter) controls
- Responsive, centered layout with subtle gradients, rounded corners, and shadows
- Accessibility: buttons are labeled with cell position and value; status uses `aria-live="polite"`, focus-visible styles provided

## Run
- `npm start` — Run locally at http://localhost:3000
- `npm test` — Run tests (includes smoke test for title and controls)
- `npm run build` — Production build

## Theming
Colors and component styles are in `src/App.css`:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

## Environment
No backend is required. Optionally, set `REACT_APP_FRONTEND_URL` to show a base hint in the footer. The app functions without it.
