const translateModule = angular.module('yunityTranslate', ['pascalprecht.translate']);

translateModule.config(function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/lang/lang-',
    suffix: '.json'
  });

	$translateProvider.determinePreferredLanguage();
  $translateProvider.useSanitizeValueStrategy('sanitize'); // http://angular-translate.github.io/docs/#/guide/19_security
});

translateModule.controller('LanguageCtrl', function ($scope, $translate) {

  $scope.changeLang = function (key) {
    $translate.use(key).then(function (key) {
      console.log("Switched language to " + key + " .");
    }, function (key) {
      console.log("Something went wrong!");
    });
  };
});

translateModule.run(() => {

});

export default 'yunityTranslate';
