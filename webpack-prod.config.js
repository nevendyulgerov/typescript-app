
// prod config
const stripLoader = require('strip-loader');
const devConfig = require('./webpack-dev.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const jsLoader = {
  test: [/\.js$/],
  exclude: /node_modules/,
  loader: stripLoader.loader('console.log')
};

devConfig.module.loaders.push(jsLoader);

devConfig.output.filename = '../dist/bundle/script.min.js';
devConfig.plugins = [
  new ExtractTextPlugin({
    filename: '../dist/bundle/style.min.css',
    allChunks: true,
  }),
];

devConfig.plugins.push(new CopyWebpackPlugin([
  {
    from: 'index.html',
    transform(content) {
      let copiedContent = content.toString('utf8');

      copiedContent = copiedContent
        .replace('style.css', 'style.min.css')
        .replace('script.js', 'script.min.js');

      return Buffer.from(copiedContent, 'utf8');
    },
    to: '../dist/'
  }
]));

module.exports = devConfig;
