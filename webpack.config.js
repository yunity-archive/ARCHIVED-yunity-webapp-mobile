var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'js/app.js'),
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      }
    ],
  },
  plugins: []
};
