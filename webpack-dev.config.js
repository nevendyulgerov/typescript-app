
// dev config
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.ts',
    './src/index.scss'
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.scss$/,
        use: 'sass-bulk-import-loader'
      }
    ],
    loaders: []
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './style.css',
      allChunks: true,
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, './bundle')
  }
};
