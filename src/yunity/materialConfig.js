export default function materialConfig($mdThemingProvider) {
  'ngInject';

  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('orange')
    .warnPalette('red');
}
