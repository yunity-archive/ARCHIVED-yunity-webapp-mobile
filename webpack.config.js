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
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'js'),
        loader: 'babel'
      },
      {
        test: /\.jsx?$/,
        // TODO(ns): need to include the yunity-webapp-common when it is not npm link'd
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: []
};
