/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: '/assets/scripts/',
  },
  devtool: 'eval-cheap-module-source-map',
  // Can also omit this - it'll be set by default
  // Describes where index.html is
  devServer: {
    contentBase: './',
  },
};
