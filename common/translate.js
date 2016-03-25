import angular from 'angular';

const translateModule = angular.module('yunityTranslate', ['pascalprecht.translate']);

translateModule.config(function ($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/lang/lang-',
    suffix: '.json'
  });

  $translateProvider.determinePreferredLanguage();
  $translateProvider.useSanitizeValueStrategy('sanitize'); // http://angular-translate.github.io/docs/#/guide/19_security
});



translateModule.directive('languageLinks', function () {
  return {
    restrict: 'A',
    templateUrl: 'assets/templates/languageLinks.html',
    controller: function($scope, $translate)
    {
      $scope.changeLang = function (key) {
        $translate.use(key);
      };
    }
  };
});

translateModule.run(() => {

});

export default 'yunityTranslate';
