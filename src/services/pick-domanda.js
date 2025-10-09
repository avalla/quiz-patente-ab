import getDomande from './get-domande';
import normalizeDomanda from './normalize-domanda';

function pick(arr) {
  return arr[~~(Math.random() * arr.length)]
}

function pickDomanda(id_argomento = null) {
  const domande = getDomande(Number(id_argomento));
  const domanda = pick(domande);
  return normalizeDomanda(domanda);
}

export default pickDomanda;
