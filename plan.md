# Bilingual Labels Plan

## Goal
Show every topic option, including the mock test, with the original Italian label and the English translation (e.g., `2. Segnali di pericolo — Danger signs`), so users clearly understand the chapter scope while preserving the native terminology.

## Constraints & Considerations
- `chapters.json` currently stores only Italian descriptions; translations must be supplied without altering the dataset pulled from upstream scripts.
- The `ArgomentoPicker` is the single consumer of chapter labels, so updates can focus there and shared utilities if needed.
- The mock test option needs an Italian+English label too (`Prova d'esame simulata — Mock test`) and should still trigger the existing mock flow.
- Ensure any new text remains maintainable: avoid duplicating translation strings across components.

## Proposed Approach
1. **Translation Map**
   - Create `src/i18n/chapters.js` exporting an object keyed by chapter ID with `{ it, en }` fields.
   - Add a dedicated entry for the mock test value in the same module for consistency.

2. **Label Builder**
   - Implement a helper (e.g., `formatChapterLabel({ id, it, en })`) that outputs `"<id>. <it> — <en>"`.
   - Handle chapters lacking a translation gracefully by falling back to the Italian-only description.

3. **Picker Update**
   - Import the translation map and helper into `ArgomentoPicker`.
   - When rendering chapters, combine the id/description from `chapters.json` with the translation lookup.
   - Use the mapped label for the mock test option via the translation module.

4. **Testing / Verification**
   - Manual pass in `npm run dev` to confirm:
     - All options display the bilingual text.
     - Mock test option still launches the mock mode.
     - Chapter selection continues to work and the chosen value is correct.
   - Re-run `npm run mock:test` to ensure the additional module doesn’t break the config validation.

5. **Documentation**
   - Update `README.md` (and optionally `docs/mock-test-plan.md`) to mention the bilingual selector if helpful for new contributors.

## Deliverables
- New translation mapping module and helper.
- Updated picker component rendering bilingual labels.
- README note about the new display.
- Confirmation of manual check + script run.
