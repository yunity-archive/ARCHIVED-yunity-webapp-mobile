const debug = require('debug')('yunity:initialize');

export default function initialize($rootScope, yAPI, $location, $route) {
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
  $rootScope.$on('$routeChangeStart', (event, next) => {
    debug('routeChangeStart next is:', next);
    yAPI.checkLogin().then(() =>  {}, () =>  {

      if (next.access !== undefined) {
        if (next.access.requiresLogin) {
          if (!yAPI.session.loggedin) {
            debug('access not allowed');
            event.preventDefault();
            $location.path('/login');
            $route.reload();
          }
        }
      }
    });
  });

}
