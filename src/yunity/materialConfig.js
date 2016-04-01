export default function materialConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('pink', {
      'default': '600'
    })
    .accentPalette('blue', {
      'default': '800'
    });
}