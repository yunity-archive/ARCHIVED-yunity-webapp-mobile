export default function materialConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('brown')
    .accentPalette('orange');
}