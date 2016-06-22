import angular from 'angular';

import yAPI from '../yunity.yAPI';
import yConversation from '../yunity.yConversation';

import yUserService from './yUserService';

export default angular.module('yunity.yUser', [yAPI, yConversation])
  .service('yUser', yUserService)
  .name;
