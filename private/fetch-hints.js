const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const uniqBy = require('lodash.uniqby')
const domande = require('./raw/domande.json');
const ids = domande.map(({ id }) => id);
async function query(qid) {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://www.quizpatenteapp.com/api/theory/',
      params: {
        f: 'get_suggestion',
        qid
      },
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function sleep(ms = 10) {
  return new Promise((r) => setTimeout(r, ms));
}

const OUTPUT = path.join(process.cwd(), 'private', 'raw');
console.log('Saving stuff to', OUTPUT);

(async function() {
  const hints = [];
  for (const [i, id] of ids.entries()) {
    const percentage = ((i + 1) * 100) / ids.length;
    if (percentage % 5 === 0) {
      console.log(`[${i + 1}/${ids.length}] ${percentage}%`);
    }
    const result = await query(id);
    hints.push(result);
    await sleep();
  }
  await fs.writeFile(path.join(OUTPUT, 'hints.json'), JSON.stringify(uniqBy(hints, ({ id }) => id)));
})();