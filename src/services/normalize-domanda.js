import getArgomento from './get-argomento';

function padImageCode(image) {
  const numeric = Number(image);
  if (Number.isNaN(numeric) || numeric <= 0) {
    return '';
  }
  return String(numeric).padStart(3, '0');
}

function normalizeDomanda(domanda) {
  if (!domanda) {
    return null;
  }

  const argomento = getArgomento(domanda.id_chapter) || {};

  return {
    ...domanda,
    image: padImageCode(domanda.image),
    argomento: argomento.descrizione || '',
  };
}

export default normalizeDomanda;
