const debug = require('debug')('yunity:yAPI');

export default class YAPI {

  constructor($http, $cookies, $rootScope , $q) {
    'ngInject';
    Object.assign(this, {

      $http, $cookies, $rootScope, $q,

      url: '/api',
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

    if (opt.url !== undefined) {
      this.url = opt.url;
    }

    if (opt.urlSuffix !== undefined) {
      this.urlSuffix = opt.urlSuffix;
    }

    if (opt.requestStart !== undefined) {
      this.requestStart = opt.requestStart;
    }

    if (opt.requestComplete !== undefined) {
      this.requestComplete = opt.requestComplete;
    }

    if (opt.requestFailed !== undefined) {
      this.requestFailed = opt.requestFailed;
    }

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

  /*
  * To do: Method checks server side is the user still logged in
  */
  checkLogin() {

    if (this.getSession().loggedIn){
      return this.$q.resolve();
    }
    return this.apiCall({
      uri: '/auth/login',
      method: 'GET'
    }).then((ret) => {

      if (ret.data.user.id !== undefined) {

        debug('check login success user is logged in');

        /*
        * User is logged in set vars
        */

        this.setSession(ret.data.user);


      } else {
        debug('user is not logged in');
      }


    }, () => {
      debug('check login failed');
    });

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
      uri: '/auth/login',
      method: 'POST',
      data: {
        email: opt.email,
        password: opt.password
      }
    }).then(
      (ret) => {
        debug('auth success');

        /*
        * maker USER Data accessable after login
        */
        /*
        * User is logged in set vars
        */
        api.setSession(ret.data.user);

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
  * Call the Api:
  * parameter Object { method, data, succes, error }
  *
  */
  apiCall(opt) {


    //debug($http.defaults.headers.common); //['X-CSRFToken'] = $cookies.get('csrftoken');

    /*
    * make this accessable
    */
    let api = this;
    let urlBase = api.url;

    /*
    * If opt is a string, use default values
    */
    if (typeof opt === 'string') {
      opt = {
        uri: opt,
        method: 'GET'
      };
    }

    /*
    * if no data and no method specified do GET othwist POST
    */
    if (opt.method === undefined && opt.data === undefined) {
      opt.method = 'GET';
    } else if (opt.method === undefined) {
      opt.method = 'POST';
    }

    if (opt.uri !== undefined) {
      urlBase += opt.uri;
    }

    if (opt.data === undefined) {
      opt.data = {};
    }

    api.requestStart();

    /*
    * RUN Angulars HTTP Call
    */
    return this.$http({
      method: opt.method,
      url: urlBase + api.urlSuffix,
      data: opt.data
    }).then((data) => {

      //     if(data.config.headers['X-CSRFToken'] != undefined) {
      //         debug('set token');
      //         $http.defaults.headers.common['X-CSRFToken'] = data.config.headers['X-CSRFToken'];
      //}

      api.requestComplete();

      //debug(data);
      //set token everytime as default token
      this.$http.defaults.headers.common['X-CSRFToken'] = this.$cookies.get('csrftoken');

      return data;
    });
  }

}
