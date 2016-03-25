import angular from 'angular';

import yChatList from './yChatListDirective';
import yChat from './yChatDirective';

export default angular.module('yunity.chat', [])
  .directive('yChatList', yChatList)
  .directive('yChat', yChat)
  .name;