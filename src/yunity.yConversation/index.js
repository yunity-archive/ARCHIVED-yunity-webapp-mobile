import angular from 'angular';

import yAPI from '../yunity.yAPI';
import ySocket from '../yunity.ySocket';

import yConversationService from './yConversationService';

export default angular.module('yunity.yConversation', [yAPI, ySocket])
  .service('yConversation', yConversationService)
  .name;
