const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 获取views文件夹下面的页面目录
const entryFile = fs.readdirSync(path.resolve(__dirname, '../views'));
const entry = {};
const output = {};

entryFile.forEach(item => {
  if (/\.html$/.test(item)) {
    const name = item.split('.')[0];
    if (name === 'spa') {
      Object.assign(entry, {
        [name]: path.resolve(__dirname, `../src/${name}/main.js`)
      });
    } else {
      Object.assign(entry, {
        [name]: path.resolve(__dirname, `../src/${name}/${name}.js`)
      });
    }
    Object.assign(output, {
      path: `${path.resolve(__dirname, `../public`)}`,
      filename: `script/[name].[hash:8].js`
    });
  }
});

console.log(entry);
console.log(output);

const options = {
  entry,
  output,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = options;