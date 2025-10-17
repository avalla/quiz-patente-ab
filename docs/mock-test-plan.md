# Mock Test Feature Plan

## Objectives
- Offer a 30-question mock exam that mirrors the official AB driving test.
- Draw one question from each of the 25 chapters to guarantee full coverage.
- Pull the remaining five questions from a configurable high-weight chapter pool.
- Keep the configuration in a dedicated file so future adjustments do not require code changes.
- Maintain existing single-question practice flow as the default mode.

## Current State Summary
- `App.jsx` stores a single question in state and calls `pickDomanda` to fetch a random entry per chapter or overall (id `0`).
- `ArgomentoPicker` renders only the real chapters coming from `chapters.json` and assumes numeric IDs.
- `pick-domanda.js` handles question normalization (chapter lookup + zero-padded image code) and returns a single item.
- There is no structure for building a batch of questions or tracking progress through multiple predefined items.

## Proposed Solution

### Configuration
- Create `src/config/mock-test.json` with:
  - `totalQuestions`: `30`
  - `coreChapters`: `[1, 2, ..., 25]`
  - `highWeightChapters`: `[2, 3, 4, 5, 6, 7, 8, 11, 12, 15]`
  - `highWeightCount`: `5`
- The JSON can be extended later (e.g., alternate pools, time limits).

### Services & Utilities
- Extract the question normalization logic from `pick-domanda` into a shared helper `normalizeQuestion(domanda)` so both single question picks and mock-test batches share consistent formatting.
- Add `getDomandeByChapters(chapterIds = [])` that returns a flat array of questions filtered by an array of chapter IDs.
- Implement `buildMockTest(config)` that:
  1. Iterates through `coreChapters`, randomly picks one question per chapter, and ensures uniqueness (retry up to N times, throw if impossible).
  2. Builds a combined pool from `highWeightChapters`, removes already-picked IDs, and randomly draws `highWeightCount` questions.
  3. Shuffles the final 30-question array (so chapter order is not predictable) and returns normalized question objects.
- Surface a dedicated error type or structured result if the dataset cannot satisfy the requested counts (better than silent failures).

### State & UI Updates
- Extend `ArgomentoPicker` to accept non-numeric option values and append a virtual option for the mock test mode.
- Update `App.jsx` to manage two flows:
  - **Practice mode** (existing): behave as today.
  - **Mock test mode**: when selected,
    - Build the mock test queue via `buildMockTest`.
    - Store queue + current index + counters in state.
    - Present questions sequentially; after each correct answer move to the next question until completion.
    - Display progress (e.g., "Question 5 / 30") and allow resetting to start over.
- When users exit mock mode (select another chapter), reset back to single-question flow.

### Edge Cases & Error Handling
- If a chapter lacks questions, show a toast or UI alert explaining that the mock test cannot start.
- On builder failure, avoid switching into mock mode to keep the app usable.
- Guard against duplicate questions by tracking question IDs in a Set.

### Testing Strategy
- **Automated check**: add a simple Node script (e.g., `npm run mock:test`) that validates the mock test invariants:
  - 30 unique question IDs.
  - Exactly one question per chapter.
  - Five questions drawn from the configured high-weight pool.
  - No chapter outside the config appears in the high-weight samples.
- **Manual UI run-through**:
  1. Launch `yarn dev`.
  2. Select the mock test option and confirm it loads 30 questions without console errors.
  3. Step through several answers (correct/incorrect) verifying progress counter and error tracking.
  4. Switch back to a chapter to ensure the app returns to practice mode.

### Implementation Checklist
1. Add the mock test configuration file.
2. Refactor question normalization into a reusable helper.
3. Implement `getDomandeByChapters` and `buildMockTest`.
4. Update `pickDomanda` to use the shared helper.
5. Introduce mock test state management in `App.jsx` and update UI to show progress/reset controls.
6. Extend `ArgomentoPicker` to support the mock test option.
7. Create the automated smoke script and run it.
8. Perform the manual UI verification.

### Out of Scope / Future Considerations
- Timer, scoring summary, or persistence of mock test results.
- Configurable mock test lengths or multiple difficulty tiers.
- UI/UX polish (dedicated mock test page, navigation improvements, etc.).
