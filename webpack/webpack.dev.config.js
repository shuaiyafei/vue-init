const fs = require('fs');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const createJson = (compilation) => {
  const chunkName = {};
  const chunkObj = compilation.chunks;
  chunkObj.forEach(item => {
    Object.assign(chunkName, {
      [item.name]: item.hash.substr(0, 20)
    });
  })
  fs.writeFile('version/dev-ver.json', JSON.stringify(chunkName), (err) => {
    console.log('writeFile', err);
  });
  return JSON.stringify(chunkName);
};

baseWebpackConfig.module.rules.push({
  test: /\.css|.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader!sass-loader"
  })
});

const options = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'style/[chunkhash].[name].css'
    }),
    new GenerateAssetPlugin({
      fn: (compilation, cb) => {
        cb(null, createJson(compilation));
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = options;
