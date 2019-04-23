const fs = require('fs');
const path = require('path');

let hashStr = '';
let buffer = '';
try {
  if (process.env.NODE_ENV === 'dev') {
    buffer = fs.readFileSync(path.resolve(__dirname, '../public/version/dev-ver.json'));
  } else {
    buffer = fs.readFileSync(path.resolve(__dirname, '../public/version/prd-ver.json'));
  }
  hashStr = buffer.toString('utf-8');
  hashStr = JSON.parse(hashStr);
} catch(e) {
  const randomHash = Math.random.toString(6) * 100000;
  const entryFile = fs.readdirSync(path.resolve(__dirname, '../views'));
  const entry = {};
  entryFile.forEach(item => {
    if (/\.html$/.test(item)) {
      Object.assign(entry, {
        item: randomHash
      });
    }
  });
  
  hashStr = JSON.stringify(entry);
}
module.exports = hashStr;