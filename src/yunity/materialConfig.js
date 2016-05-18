export default function materialConfig($mdThemingProvider) {
  'ngInject';
  
  $mdThemingProvider.definePalette('yunityBlue', {
    '50': 'FFFFFF',
    '100': 'FFFFFF',
    '200': 'FFFFFF',
    '300': 'FFFFFF',
    '400': 'FFFFFF',
    '500': '196687',
    '600': 'FFFFFF',
    '700': '124C65',
    '800': 'FFFFFF',
    '900': 'FFFFFF',
    'A100': 'FFFFFF',
    'A200': 'FFFFFF',
    'A400': 'FFFFFF',
    'A700': 'FFFFFF',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [ '50', '100', '200',
                            '300', '400', 'A100' ],
  });
  
  $mdThemingProvider.theme('default')
    .primaryPalette('pink', {
      'default': '600',
      'hue-1': '400'
    })
    .accentPalette('yunityBlue', {
      'default': '500',
      'hue-1': '700'
    })
    .backgroundPalette('grey', {
      'default': '200',
      'hue-1': '100'
    });
}
