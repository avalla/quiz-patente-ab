import config from '../config/mock-test.js';
import getDomandeByChapters from './get-domande-by-chapters';
import normalizeDomanda from './normalize-domanda';

function pickRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  const [item] = array.splice(index, 1);
  return item;
}

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function assertEnoughQuestions(pool, required, context) {
  if (pool.length < required) {
    throw new Error(`Unable to build mock test: not enough questions for ${context}. Required ${required}, found ${pool.length}.`);
  }
}

function buildMockTest(customConfig = config) {
  const {
    totalQuestions,
    coreChapters,
    highWeightChapters,
    highWeightCount,
  } = customConfig;

  if (!Array.isArray(coreChapters) || coreChapters.length === 0) {
    throw new Error('Mock test configuration requires at least one core chapter.');
  }

  const selected = [];
  const usedIds = new Set();

  coreChapters.forEach((chapterId) => {
    const pool = getDomandeByChapters([chapterId]).filter(
      (domanda) => !usedIds.has(domanda.id),
    );
    assertEnoughQuestions(pool, 1, `chapter ${chapterId}`);
    const domanda = pickRandomItem(pool);
    selected.push(domanda);
    usedIds.add(domanda.id);
  });

  const remainingForHighWeight = Math.max(
    0,
    Math.min(highWeightCount, totalQuestions - selected.length),
  );

  if (remainingForHighWeight > 0) {
    const highPool = getDomandeByChapters(highWeightChapters).filter(
      (domanda) => !usedIds.has(domanda.id),
    );
    assertEnoughQuestions(highPool, remainingForHighWeight, 'high-weight chapters');

    for (let i = 0; i < remainingForHighWeight; i += 1) {
      const domanda = pickRandomItem(highPool);
      selected.push(domanda);
      usedIds.add(domanda.id);
    }
  }

  const remainingSlots = totalQuestions - selected.length;
  if (remainingSlots > 0) {
    const fallbackPool = getDomandeByChapters().filter(
      (domanda) => !usedIds.has(domanda.id),
    );
    assertEnoughQuestions(fallbackPool, remainingSlots, 'fallback pool');
    for (let i = 0; i < remainingSlots; i += 1) {
      const domanda = pickRandomItem(fallbackPool);
      selected.push(domanda);
      usedIds.add(domanda.id);
    }
  }

  const normalized = selected.map((domanda) => normalizeDomanda(domanda));
  return shuffleArray(normalized);
}

export default buildMockTest;
