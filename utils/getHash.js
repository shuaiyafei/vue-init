const fs = require('fs');
const path = require('path');

const buffer = fs.readFileSync(path.resolve(__dirname, '../public/version/ver.json'));
const hashStr = buffer.toString('utf-8');
module.exports = JSON.parse(hashStr);