const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const domande = require('./raw/domande.json');
const ids = [...new Set(domande.filter(({image}) => image !== 0).map(({ image }) => image))];

const OUTPUT = path.join(process.cwd(), 'raw', 'images');
console.log('Saving stuff to', OUTPUT);
async function query(qid) {
  try {
    const image = ('000' + qid).slice(-3);
    const response = await axios({
      method: 'get',
      url: `https://www.quizpatenteapp.com/Cartelli/img${image}.gif`,
      responseType: 'arraybuffer',
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function sleep(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

(async function() {
  for (const [i, id] of ids.entries()) {
    console.log('Requesting', id);
    const percentage = ((i + 1) * 100) / ids.length;
    if (percentage % 5 === 0) {
      console.log(`Fetch image [${i + 1}/${ids.length}] ${percentage}%`);
    }
    const image = ('000' + id).slice(-3);
    const result = await query(image);
    await fs.writeFile(path.join(OUTPUT, `${image}.gif`), result);
    await sleep();
  }
})();