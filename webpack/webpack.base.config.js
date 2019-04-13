const path = require('path');
const fs = require('fs');

// 获取views文件夹下面的页面目录
const entryFile = fs.readdirSync(path.resolve(__dirname, '../views'));
const entry = {};
const output = {};

entryFile.forEach(item => {
  if (/\.html$/.test(item)) {
    const name = item.split('.')[0];
    if (name === 'spa') {
      Object.assign(entry, {
        [name]: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, `../src/${name}/main.js`)]
      });
    } else {
      Object.assign(entry, {
        [name]: path.resolve(__dirname, `../src/${name}/${name}.js`)
      });
    }
    Object.assign(output, {
      path: `${path.resolve(__dirname, `../public`)}`,
      filename: `script/[chunkhash].[name].js`
    });
  }
});

const options = {
  entry,
  output,
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jpg|png|gif|jpeg$/,
        use: 'url-loader'
      }
    ]
  }
};

module.exports = options;
