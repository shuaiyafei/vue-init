const portObj = require('./portConfig');

new Promise((resolve, reject) => {
  Object.assign(process.env, {
    PORT: portObj.PORT,
    NODE_ENV: 'prd'
  });
  resolve();
}).then(() => {
  require('../app.js');
}).catch((err) => {
  console.log(err);
});