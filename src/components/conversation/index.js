import angular from 'angular';

import conversationList from './conversationListDirective';
import conversationPage from './conversationPageDirective';

export default angular.module('yunity.conversation', [])
  .directive('conversationList', conversationList)
  .directive('conversation', conversationPage)
  .name;