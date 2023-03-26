const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const types = Array(25).fill(0).map((element, index) => index + 1);

async function query(type = 0) {
  const response = await axios({
    method: 'get',
    url: 'https://www.quizpatenteapp.com/api/quiz/',
    params: {
      f: 'get_questions',
      database: 'AB',
      chapters: '',
      language: '',
      num_of_question: 10000,
      type,
    },
  })
  return response.data;
}

const output = path.join(process.cwd(), 'raw');
console.log('Saving stuff to', output);
(async function() {
  for (const type of types) {
    const result = await query(type);
    await fs.writeFile(path.join(output, `${type}.json`), JSON.stringify(result));
  }
})();