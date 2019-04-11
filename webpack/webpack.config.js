const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
      filename: `script/[chunkhash].[name].js`
    });
  }
});

const createJson = (compilation) => {
  const chunkName = {};
  const chunkObj = compilation.chunks;
  chunkObj.forEach(item => {
    Object.assign(chunkName, {
      [item.name]: item.hash
    });
  })
  return JSON.stringify(chunkName);
};

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
      },
      {
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!sass-loader"
        })
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new GenerateAssetPlugin({
      filename: `version/ver.json`,
      fn: (compilation, cb) => {
        cb(null, createJson(compilation));
      },
      extraFiles: []
    }),
    new ExtractTextPlugin({
      filename:'style/[chunkhash:8].[name].css'
    })
  ]
};

module.exports = options;