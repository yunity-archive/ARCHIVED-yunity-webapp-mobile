const debug = require('debug')('yunity:yAPI');

export default class YAPI {

  constructor($http, $cookies) {
    'ngInject';
    Object.assign(this, {

      $http, $cookies,

      url: '',
      urlSuffix: '',
      requestStart: () => {},
      requestComplete: () => {},
      requestFailed: () => {}
    });
    debug('yAPI service initialized');

  }

  config(opt) {
    Object.assign(this, opt);
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
