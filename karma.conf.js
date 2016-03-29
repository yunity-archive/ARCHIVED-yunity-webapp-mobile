var webpackConfig = require('./webpack.config');
var fs = require('fs');
var bsConfigFile = './browserstack.json';

module.exports = function(config) {

  var webpackLoaders = webpackConfig.module.loaders;

  /* hack to remove the extract-text-webpack-plugin when
    running karma (it causes the tests to fail otherwise) */
  webpackLoaders.forEach(function(entry){
    var loader = entry.loader;
    if (!loader) return;
    if (loader.indexOf('extract-text-webpack-plugin') === -1) return;
    entry.loader = loader.split(/!/g).slice(1).join('!');
  });

  var karmaConfig = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/main.js'
    ],
    exclude: [],
    preprocessors: {
      'spec/main.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: webpackLoaders
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS', 'Firefox'],
    customLaunchers: {},
    singleRun: false,
    concurrency: Infinity
  };

  if (fs.existsSync(bsConfigFile)) {

    var bsConfig = JSON.parse(fs.readFileSync(bsConfigFile, 'utf8'));
    karmaConfig.browserStack = bsConfig;

    karmaConfig.customLaunchers['bs_firefox_mac'] = {
      base: 'BrowserStack',
      browser: 'firefox',
      browser_version: '21.0',
      os: 'OS X',
      os_version: 'Mountain Lion'
    };

    karmaConfig.customLaunchers['bs_iphone5'] = {
      base: 'BrowserStack',
      device: 'iPhone 5',
      os: 'ios',
      os_version: '6.0'
    };

  }

  config.set(karmaConfig);
}
