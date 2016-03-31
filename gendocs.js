require('babel-register');

// https://github.com/petebacondarwin/dgeni-angular/blob/master/docs/dgeni-conf.js
// https://github.com/angular/dgeni-packages

var path = require('path');

var Dgeni = require('dgeni');

var Package = Dgeni.Package;

var pkg = new Package('dgeni-yunity', [
  require('dgeni-packages/base'),
  //require('dgeni-packages/git'),
  //require('dgeni-packages/examples'),
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/jsdoc'),
  require('dgeni-packages/nunjucks')
]);

pkg.config(function(log, readFilesProcessor, writeFilesProcessor){
  log.level = process.env.LOG_LEVEL || 'info';
  readFilesProcessor.basePath = path.resolve(__dirname);
  readFilesProcessor.sourceFiles = [
    { include: 'src/**/*.js', basePath: __dirname }
  ];
  writeFilesProcessor.outputFolder = 'build';
});

pkg.config(function(templateFinder, templateEngine) {

  // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
  templateEngine.config.tags = {
    variableStart: '{$',
    variableEnd: '$}'
  };

  templateFinder.templateFolders
      .unshift(path.resolve(__dirname, 'src'));

  templateFinder.templatePatterns = [
    'components/profile/listUsersPage.html',
    '${ doc.template }',
    '${ doc.id }.html'
  ];
});

pkg.config(function(getLinkInfo) {
  getLinkInfo.relativeLinks = true;
});

var dgeni = new Dgeni([pkg]);
dgeni.generate();
