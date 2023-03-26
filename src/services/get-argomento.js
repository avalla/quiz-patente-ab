import argomenti from './chapters.json';

function getArgomento(id_chapter) {
  const argomento = argomenti.find(a => a.id_chapter === id_chapter);
  return argomento || {};
}

export default getArgomento;