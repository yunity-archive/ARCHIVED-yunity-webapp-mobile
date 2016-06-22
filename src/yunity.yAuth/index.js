import angular from 'angular';

import yAPI from '../yunity.yAPI';
import yConversation from '../yunity.yConversation';

import yAuthService from './yAuthService';

export default angular.module('yunity.yAuth', [yAPI, yConversation])
  .service('yAuth', yAuthService)
  .name;
