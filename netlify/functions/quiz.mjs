import pickDomanda from '../../src/services/pick-domanda.js';

export default async (req, context) => {
    const domanda = pickDomanda();
    return new Response(domanda);
};