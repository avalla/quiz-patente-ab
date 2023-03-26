import hints from './hints.json'

function getHint(theory) {
    if (isNaN(theory)) {
        throw new Error('Value not accepted as theory');
    }
    return hints.find(({id}) => id === Number(theory)) || {};
}

export default getHint;