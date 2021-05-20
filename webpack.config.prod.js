/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
    chunkFilename: '[name].js',
  },
  // optimization: {
  //   chunkIds: 'natural', //ids or 0,1,2 in names
  // },
  // Can also omit this - it'll be set by default
  // Describes where index.html is
  devServer: {
    contentBase: './',
  },
};
