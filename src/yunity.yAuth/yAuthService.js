const debug = require('debug')('yunity:yAuth');

export default class YAuth {

  constructor(yAPI, yConversation, ySession) {
    'ngInject';
    Object.assign(this, {
      yAPI, yConversation, ySession
    });
    debug('yAuthService initialized');
  }

  getStatus() {
    return this.yAPI.apiCall({
      uri: '/auth/status',
      method: 'GET'
    });
  }

  sendLogin(data) {
    return this.yAPI.apiCall({
      uri: '/auth',
      method: 'POST',
      data: {
        email: data.email,
        password: data.password
      }
    });
  }

  sendLogout() {
    return this.yAPI.apiCall({
      uri: '/auth/logout',
      method: 'POST',
      data: {}
    });
  }

  /* pass this into a route resolve config
     it will ensure that we always check if the user
     is logged in when first loading any route
  */
  resolve() {
    if (!this.resolvePromise) {
      this.resolvePromise = this.getStatus().then(({ data }) => {
        let user = data;
        if (user && user.id !== undefined) {
          this.ySession.setSession(user);
        }
      }).catch((err) => {
        debug('failed checking login status', err);
      });
    }
    return this.resolvePromise;
  }


  authenticate(data) {
    return this.sendLogin(data).then((ret) => {
      debug('auth success', ret);
      this.ySession.setSession(ret.data);
      return ret;
    })
    .catch((err) => {
      debug('auth error', err);
      return err;
    });
  }

  logout() {
    this.sendLogout().then((res) => {
      debug('logout', res);
      this.ySession.clearSession();
    }, (err) => {
      debug('error while signup', err);
    });
  }

}
