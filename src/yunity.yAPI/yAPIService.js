const debug = require('debug')('yunity:yAPI');

export default class YAPI {

  constructor($http, $cookies, $rootScope , $q) {
    'ngInject';
    Object.assign(this, {

      $http, $cookies, $rootScope, $q,

      url: '',
      urlSuffix: '',
      requestStart: () => {},
      requestComplete: () => {},
      requestFailed: () => {},
      users: [],
      session: {
        loggedIn: false,
        user: {},
        chats: []
      }

    });

  }

  config(opt) {
    Object.assign(this, opt);
  }

  getSession() {
    return this.session;
  }

  setSession(user) {
    this.session = {
      loggedIn: true,
      user,
      chats: []
    };
    this.$rootScope.session = this.session;
  }

  clearSession() {
    this.session = {
      loggedIn: false,
      user: {},
      chats: []
    };
    this.$rootScope.session = this.session;
  }

  /* pass this into a route resolve config
     it will ensure that we always check if the user
     is logged in when first loading any route
  */
  resolve() {
    if (!this.resolvePromise) {
      this.resolvePromise = this.apiCall({
        uri: '/auth/status',
        method: 'GET'
      }).then(({ data }) => {
        let user = data;
        if (user && user.id !== undefined) {
          this.setSession(user);
        }
      }).catch((err) => {
        debug('failed checking login status', err);
      });
    }
    return this.resolvePromise;
  }

  /*
  * list Mappable Items by Filter
  * Param Object => {filter}
  */
  listMappable(opt) {

    return this.apiCall('/items').then(
      (ret) => {
        debug('listmappables success');
        if (opt.success !== undefined) {
          opt.success(ret);
        }
      },
      (ret) => {
        debug('listmappables error');
        if (opt.error !== undefined) {
          opt.error(ret);
        }
      }
    );

  }

  /**
  * Auth API call
  * @param object => {email,password,[success],[error]}
  */
  authenticate(opt) {

    debug(opt);

    let api = this;

    return this.apiCall({
      uri: '/auth',
      method: 'POST',
      data: {
        email: opt.email,
        password: opt.password
      }
    }).then(
      (ret) => {
        debug('auth success');

        // make USER Data accessible after login
        // User is logged in set vars
        api.setSession(ret.data);

        if (opt.success !== undefined) {
          opt.success(ret);
        }
      },
      (ret) => {
        debug('auth error');
        if (opt.error !== undefined) {
          opt.error(ret);
        }
      }
    );
  }

  getUsers(userIds) {
    let userIdsString = userIds.join(',');
    return this.apiCall('/user/' + userIdsString);
  }

  /*
  * Call to the backend API:
  * parameter Object { method, data, succes, error }
  *
  */
  apiCall(opt) {
    let urlBase = this.url;

    if (typeof opt === 'string') {
      opt = {
        uri: opt,
        method: 'GET'
      };
    }

    urlBase += opt.uri;

    if (opt.data === undefined) {
      opt.data = {};
    }

    this.requestStart();
    return this.$http({
      method: opt.method,
      url: urlBase + this.urlSuffix,
      data: opt.data
    }).then((data) => {
      this.requestComplete();
      this.$http.defaults.headers.common['X-CSRFToken'] = this.$cookies.get('csrftoken');
      return data;
    });
  }

}
