import pickDomanda from '../../src/services/pick-domanda.js';

export default async (req, context) => {
    const domanda = pickDomanda(null);
    return new Response(domanda);
};