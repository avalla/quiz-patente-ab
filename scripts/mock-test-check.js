const assert = require('node:assert/strict');
const path = require('node:path');

const questions = require(path.join(__dirname, '../src/services/questions.json'));
const config = require(path.join(__dirname, '../src/config/mock-test.json'));

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

function getDomandeByChapters(chapterIds = []) {
  if (!Array.isArray(chapterIds) || chapterIds.length === 0) {
    return [...questions];
  }
  const chapterSet = new Set(chapterIds.map(Number));
  return questions.filter((question) => chapterSet.has(Number(question.id_chapter)));
}

function buildMockTest() {
  const {
    totalQuestions,
    coreChapters,
    highWeightChapters,
    highWeightCount,
  } = config;

  const selected = [];
  const usedIds = new Set();

  coreChapters.forEach((chapterId) => {
    const pool = getDomandeByChapters([chapterId]).filter(
      (question) => !usedIds.has(question.id),
    );
    if (pool.length === 0) {
      throw new Error(`Missing questions for chapter ${chapterId}`);
    }
    const question = pickRandomItem(pool);
    selected.push(question);
    usedIds.add(question.id);
  });

  const remainingHighWeight = Math.max(
    0,
    Math.min(highWeightCount, totalQuestions - selected.length),
  );

  if (remainingHighWeight > 0) {
    const highPool = getDomandeByChapters(highWeightChapters).filter(
      (question) => !usedIds.has(question.id),
    );
    if (highPool.length < remainingHighWeight) {
      throw new Error('Insufficient questions in high-weight pool');
    }
    for (let i = 0; i < remainingHighWeight; i += 1) {
      const question = pickRandomItem(highPool);
      selected.push(question);
      usedIds.add(question.id);
    }
  }

  const remainingSlots = totalQuestions - selected.length;
  if (remainingSlots > 0) {
    const fallbackPool = getDomandeByChapters().filter(
      (question) => !usedIds.has(question.id),
    );
    if (fallbackPool.length < remainingSlots) {
      throw new Error('Insufficient questions in fallback pool');
    }
    for (let i = 0; i < remainingSlots; i += 1) {
      const question = pickRandomItem(fallbackPool);
      selected.push(question);
      usedIds.add(question.id);
    }
  }

  return shuffleArray(selected);
}

function runAssertions() {
  const result = buildMockTest();

  assert.equal(
    result.length,
    config.totalQuestions,
    `Expected ${config.totalQuestions} questions but received ${result.length}`,
  );

  const uniqueIds = new Set(result.map((question) => question.id));
  assert.equal(uniqueIds.size, result.length, 'Questions should be unique within the mock test.');

  const chaptersPresent = new Set(result.map((question) => question.id_chapter));
  config.coreChapters.forEach((chapterId) => {
    assert(
      chaptersPresent.has(chapterId),
      `Chapter ${chapterId} is missing from the mock test selection.`,
    );
  });

  const highWeightTotal = config.highWeightChapters.length + config.highWeightCount;
  const actualHighWeight = result.filter((question) => config.highWeightChapters.includes(question.id_chapter)).length;
  assert.equal(
    actualHighWeight,
    highWeightTotal,
    `Expected ${highWeightTotal} high-weight questions but received ${actualHighWeight}.`,
  );
}

try {
  runAssertions();
  console.log('Mock test configuration checks passed ✅');
} catch (error) {
  console.error('Mock test configuration checks failed ❌');
  console.error(error);
  process.exit(1);
}
