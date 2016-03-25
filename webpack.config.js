var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, '_entry.js'),
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'app.js',
    publicPath: '/build/',
    pathinfo: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.js?$/,
        include: [
          __dirname
        ],
        exclude: /(node_modules|bower_components)/,
        loaders: ['ng-annotate', 'babel-loader']
      }, {
        test: /\.html$/,
        loaders: ['ngtemplate', 'html'],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: []
};
