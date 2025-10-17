import domande from './questions.json';

function getDomandeByChapters(chapterIds = []) {
  if (!Array.isArray(chapterIds) || chapterIds.length === 0) {
    return [...domande];
  }

  const chapterSet = new Set(chapterIds.map(Number));

  return domande.filter((domanda) => chapterSet.has(Number(domanda.id_chapter)));
}

export default getDomandeByChapters;
