const debug = require('debug')('yunity:initialize');

export default function initialize($rootScope, yAPI) {
  'ngInject';

  /*
  * API Configuration
  */
  yAPI.config({
    url: '/api',
    urlSuffix: '',
    requestStart: () => {
      $rootScope.loading = true;
      debug('start');
    },
    requestComplete: () => {
      debug('complete');
      $rootScope.loading = false;
    }
  });

}
