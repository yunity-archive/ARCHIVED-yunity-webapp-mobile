import angular from 'angular';
import ngCookies from 'angular-cookies';
import ySession from '../yunity.ySession';

import ySocketService from './ySocketService';

import { SESSION_COOKIE_NAME } from './settings';

function httpInterceptor($cookies, ySocket) {
  'ngInject';
  return {
    response: (response) => {
      ySocket.setSessionId($cookies.get(SESSION_COOKIE_NAME));
      return response;
    }
  };
}

function httpConfig($httpProvider) {
  'ngInject';
  $httpProvider.interceptors.push(httpInterceptor);
}

export default angular.module('yunity.ySocket', [ngCookies, ySession])
  .service('ySocket', ySocketService)
  .config(httpConfig)
  .name;
