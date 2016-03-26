var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(__dirname, 'src/yunity.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
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
      },
      {
        test: /\.png$/,
        loaders: ['file?name=assets/[hash].[ext]'],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: []
};
