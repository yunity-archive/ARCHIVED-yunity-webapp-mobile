const debug = require('debug')('yunity:component:logoutPage');

export default class LogoutPageCtrl {

  constructor(yAPI, $location) {
    'ngInject';
    Object.assign(this, {
      yAPI, $location
    });
  }

  logout() {
    this.yAPI.apiCall({
      uri: '/auth/logout',
      method: 'POST',
      data: {}
    }).then((res) => {
      debug('logout', res);
      this.$location.path('login');
      this.yAPI.clearSession();
    }, (err) => {
      debug('error while signup', err);
    });
  }
}
