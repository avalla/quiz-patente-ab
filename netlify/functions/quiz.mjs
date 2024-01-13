import pickDomanda from '../../src/services/pick-domanda.js';

export default async (req, context) => {
    const domanda = pickDomanda(null);
    domanda.image = `https://quiz-patente.netlify.app/${domanda.image}.gif`
    return new Response(JSON.stringify(domanda));
};