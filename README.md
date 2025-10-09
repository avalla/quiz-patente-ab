# AB Driving License Quiz

[![Netlify Status](https://api.netlify.com/api/v1/badges/34ee311d-07e0-4c82-8032-e1a53e1ae203/deploy-status)](https://app.netlify.com/sites/quiz-patente/deploys)

## Overview
- Single page application to practice the official Italian Ministry AB license quizzes from a locally stored dataset.
- Interface built with Chakra UI, optimized for quick use on both desktop and mobile devices.
- Offline ready: questions, hints, and traffic sign images ship as static bundles.

## Tech Stack
- Vite + React 18 with StrictMode and `react-dom/client` for rendering.
- Chakra UI provides layout primitives, accessible components, and color mode handling via `ColorModeSwitcher`.
- Static JSON datasets (`questions.json`, `chapters.json`, `hints.json`) and assets under `public/images`.
- No routing: the app runs on a single view whose state is managed through React hooks.

## Code Structure
- `src/App.jsx`: core of the app; controls the current question, counters, errors, and topic changes.
- `src/main.jsx`: entry point loaded by `index.html`, injects `ColorModeScript` and mounts `App` in StrictMode.
- `src/components/ArgomentoPicker.jsx`: Chakra select populated with topics pulled from `services/chapters.json`.
- `src/components/Domanda/Domanda.jsx`: shows the question text, images, true/false buttons, and invokes success or error callbacks.
- `src/components/Figura/Figura.jsx`: zero pads the image code (`000` + id) and renders `/images/<id>.gif`.
- `src/components/Hint/Hint.jsx`: opens a Chakra modal with title and HTML description retrieved from `get-hint.js`.
- `src/services/`: data access layer with pure utilities (`pick-domanda.js`, `get-domande.js`, `get-argomento.js`, `get-hint.js`).
- `private/`: Node scripts that rebuild datasets and images by querying `quizpatenteapp.com` (not used at runtime).

## Application Flow
- On start `App` calls `pickDomanda` without filters, generates a random question, and shows a spinner until data is ready.
- Selecting a topic through `ArgomentoPicker` recalculates the question, fetching only entries with the matching `id_chapter`.
- `Domanda` compares the user answer with `answer`; it uses `useToast` for instant feedback and updates the total counter (`totali`) or the list of wrong answers (`errate`).
- `Hint` pairs the question with the theory (`theory`) and displays the HTML string inside the modal; if empty it falls back to "Missing hint".
- `Figura` renders the image only if the numeric code is greater than zero, avoiding blank space otherwise.

## Datasets and Services
- `questions.json`: array of questions with `id`, `id_chapter`, `image`, `question`, `answer`, `theory`. Filtered via `getDomande`, which accepts `0` to include every topic.
- `chapters.json`: list of chapters with descriptions, used to populate the dropdown menu and display the title inside `Domanda`.
- `hints.json`: hints linked by `theory`, may contain HTML (rendered through `dangerouslySetInnerHTML`).
- `public/images`: GIF traffic signs named with three digits (`001.gif`, `240.gif`, ...); `Figura` builds the relative path.
- `private/fetch-*.js`: optional Node scripts based on Axios and `lodash.uniqby` that download new questions, hints, and images (require external APIs and do not run in the browser).

## State and Scoring Logic
- `totali` starts at zero and increases only after each correct answer, tracking how many questions were attempted.
- `errate` is an array of unique ids; `addErrate` avoids duplicates so the counter stays accurate.
- Visual feedback comes from success or error toasts and the hint modal, which players can open at any time.

## Local Development
- Requirements: Node 16+ and Yarn 1.x.
- Install dependencies: `yarn install`.
- Development mode: `yarn dev` launches Vite with hot reload (default port 5173).
- Production build: `yarn build` outputs static assets in `dist/`, ready for Netlify.
- Preview build: `yarn preview` serves the optimized build for local QA.

## Deploy Notes
- Deployments are automated by Netlify (see badge above). Uploading the `dist/` folder serves the app entirely from the CDN.
- Keep static assets aligned: adding questions or images requires regenerating the JSON payloads and committing the assets.

## Future Enhancements
- Add persistent tracking of correct and incorrect answers (e.g., localStorage) to analyze progress over time.
- Include per-chapter statistics (error rate) and an exam mode with a timer plus a fixed number of questions.
- Localize the interface and improve accessibility for screen readers (dedicated aria-labels, modal focus trapping).
