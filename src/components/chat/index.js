import angular from 'angular';

import yChatList from './yChatListDirective';
import yChatPage from './yChatPageDirective';
import yChatCreate from './yChatCreateDirective';

export default angular.module('yunity.chat', [])
  .directive('yChatList', yChatList)
  .directive('yChatPage', yChatPage)
  .directive('yChatCreate', yChatCreate)
  .name;