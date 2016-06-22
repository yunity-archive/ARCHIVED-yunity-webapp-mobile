import angular from 'angular';

import yAPI from '../yunity.yAPI';

import ySessionService from './ySessionService';

export default angular.module('yunity.ySession', [yAPI])
  .service('ySession', ySessionService)
  .name;
