# AB Driving License Quiz
- It is possible to run this by just using Netlify.
[![Netlify Status](https://api.netlify.com/api/v1/badges/34ee311d-07e0-4c82-8032-e1a53e1ae203/deploy-status)](https://app.netlify.com/sites/quiz-patente/deploys)

## What is this?
- A single page practice tool built for the Italian AB driving theory exam.
- Works entirely offline once built: questions, hints, and traffic sign images are bundled with the app.
- Topic selector shows each chapter in Italian followed by the English translation, including a full mock test mode.

## Quick start (new users)
1. **Install Node.js** – Version 18 or newer is recommended. The easiest path is to download it from [nodejs.org](https://nodejs.org/).
2. **Clone the project**
   ```bash
   git clone https://github.com/<your-account>/quiz-patente-ab.git
   cd quiz-patente-ab
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
   Yarn also works (`yarn install`), but the repo ships with an `npm` lockfile.
4. **Run the app locally**
   ```bash
   npm run dev
   ```
   Then open the printed URL (by default `http://localhost:5173`) in your browser.

### Everyday commands
- `npm run dev` – start the Vite dev server with hot reload.
- `npm run build` – create the production bundle inside `dist/`.
- `npm run preview` – serve the production build locally.
- `npm run mock:test` – smoke-check the mock test configuration.

## Using the quiz
- **Practice mode:** choose any chapter from the dropdown to drill random questions from that area.
- **Mock test:** pick the “Prova d'esame simulata — Mock test” option for a 30-question exam (one per chapter plus five weighted towards tricky topics). Scores and restart controls appear once the run finishes.
- **Hints:** the lightbulb button opens a modal with theory explanations when available.
- **Images:** traffic-sign questions display a picture when the dataset specifies one.

## Feature highlights
- Chakra UI for responsive, accessible layout with light/dark mode.
- Randomized question selection with on-screen counters for total attempts and mistakes.
- Local datasets (`questions.json`, `chapters.json`, `hints.json`, `public/images`) so the app never depends on live APIs during use.
- Optional Node scripts under `private/` to refresh datasets from the upstream source (not required for daily development).

## Under the hood
- **Tech stack:** Vite + React 18 (StrictMode), Chakra UI, and a pure-function data layer.
- **Key files:**
  - `src/App.jsx` – orchestrates modes, question state, scoring, and mock exams.
  - `src/components/ArgomentoPicker.jsx` – bilingual topic dropdown with mock test entry.
  - `src/components/Domanda/Domanda.jsx` – renders the question, answer buttons, and feedback.
  - `src/services/*` – utilities for loading and normalizing questions, looking up chapters, and composing mock tests.
- **State flow:** questions are picked via `pickDomanda` (practice) or `buildMockTest` (exam). Answers update the total counter and track incorrect IDs to avoid duplicate penalties.

## Deploy notes
- Netlify automatically builds and deploys from `main` (see badge above). You can also push the `dist/` folder to any static host.
- If you refresh datasets or assets, rebuild the production bundle (`npm run build`) before deploying so the changes ship together.

## Roadmap ideas
- Persist answer history (e.g., `localStorage`) to track progress over time.
- Add chapter-level stats, timed exam mode, and printable results.
- Expand localization and accessibility (screen-reader optimisations, keyboard shortcuts).
