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
        [name]: [path.resolve(__dirname, `../src/${name}/main.js`), 'webpack-hot-middleware/client?noInfo=true&reload=true']
      });
    } else {
      Object.assign(entry, {
        [name]: path.resolve(__dirname, `../src/${name}/${name}.js`)
      });
    }
    Object.assign(output, {
      path: `${path.resolve(__dirname, `./../public`)}`,
      filename: `script/[name].js?[hash]`,
      publicPath: 'http://10.4.13.215:3000/'
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
