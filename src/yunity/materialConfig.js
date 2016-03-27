export default function materialConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
}