const fs = require('fs');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const createJson = (compilation) => {
  const chunkName = {};
  const chunkObj = compilation.chunks;
  chunkObj.forEach(item => {
    Object.assign(chunkName, {
      [item.name]: item.hash.substr(0, 20)
    });
  })
  fs.writeFile('version/prd-ver.json', JSON.stringify(chunkName), (err) => {
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
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'style/[name].css?[hash]'
    }),
    new GenerateAssetPlugin({
      filename: 'version/prd-ver.json',
      fn: (compilation, cb) => {
        cb(null, createJson(compilation));
      }
    }),
  ]
});

module.exports = options;
