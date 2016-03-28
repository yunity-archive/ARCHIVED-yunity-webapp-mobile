import angular from 'angular';

import yAPI from '../yunity.yAPI';
import ySocket from '../yunity.ySocket';

import yChatService from './yChatService';

export default angular.module('yunity.yChat', [yAPI, ySocket])
  .service('yChat', yChatService)
  .name;
