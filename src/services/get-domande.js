import domande from './questions.json';

function getDomande(id_argomento) {
  console.log('Get domande', id_argomento)
  return domande.filter(d => id_argomento === d.id_chapter || id_argomento === 0)
}

export default getDomande;