import angular from 'angular';

/*

  This is not operational yet, I just copied it over.... will need work

    ns - 26/03/2016

*/

const translateModule = angular.module('yunityTranslate', ['pascalprecht.translate']);

translateModule.config(($translateProvider) => {

  $translateProvider.useStaticFilesLoader({
    prefix: '/assets/lang/lang-',
    suffix: '.json'
  });

  $translateProvider.determinePreferredLanguage();
  
  // http://angular-translate.github.io/docs/#/guide/19_security
  $translateProvider.useSanitizeValueStrategy('sanitize');
});


translateModule.directive('languageLinks', () => {
  return {
    restrict: 'A',
    templateUrl: 'assets/templates/languageLinks.html',
    controller: ($scope, $translate) => {
      $scope.changeLang = (key) => {
        $translate.use(key);
      };
    }
  };
});

translateModule.run(() => {

});

export default 'yunityTranslate';
