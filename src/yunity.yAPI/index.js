import angular from 'angular';
import ngCookies from 'angular-cookies';

import yAPIService from './yAPIService';
import initialize from './initialize';

export default angular.module('yunity.yAPI', [ngCookies])
  .service('yAPI', yAPIService)
  .run(initialize)
  .name;