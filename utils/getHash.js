const fs = require('fs');
const path = require('path');

let hashStr = '';
try {
  const buffer = fs.readFileSync(path.resolve(__dirname, '../public/version/dev-ver.json'));
  hashStr = buffer.toString('utf-8');
  hashStr = JSON.parse(hashStr);
} catch(e) {
}
module.exports = hashStr;