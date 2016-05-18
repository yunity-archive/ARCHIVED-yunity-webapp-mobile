export default function materialConfig($mdThemingProvider) {
  'ngInject';
  $mdThemingProvider.theme('default')
    .primaryPalette('pink', {
      'default': '600',
      'hue-1': '400'
    })
    .accentPalette('blue', {
      'default': '800'
    })
    .backgroundPalette('grey', {
      'default': '200',
      'hue-1': '100'
    });
}