import angular from 'angular';
import ngCookies from 'angular-cookies';

import yAPIService from './yAPIService';

function initialize($http, $cookies) {
  'ngInject';
  let token = $cookies.get('csrftoken');
  if (token !== undefined) {
    $http.defaults.headers.common['X-CSRFToken'] = token;
  }
}

export default angular.module('yunity.yAPI', [ngCookies])
  .service('yAPI', yAPIService)
  .run(initialize)
  .name;