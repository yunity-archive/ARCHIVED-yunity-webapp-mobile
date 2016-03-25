import angular from 'angular';

import yChatList from './y-chat-list';
import yChat from './y-chat';

export default angular.module('yunity.chat', [])
  .directive('yChatList', yChatList)
  .directive('yChat', yChat)
  .name;