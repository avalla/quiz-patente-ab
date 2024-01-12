import getDomande from './get-domande';
import getArgomento from './get-argomento';

function pick(arr) {
  return arr[~~(Math.random() * arr.length)]
}

function pickDomanda(id_argomento = null) {
  const domande = getDomande(Number(id_argomento));
  const domanda = pick(domande);
  const argomento = getArgomento(domanda.id_chapter);
  const image = ('000' + domanda.image).slice(-3)
  return {
    ...domanda,
    image,
    argomento: argomento.descrizione
  };
}

export default pickDomanda;