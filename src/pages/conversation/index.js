import angular from 'angular';
import ySession from '../../yunity.ySession';
import yConversation from '../../yunity.yConversation';

import conversationListTemplate from './conversationList.html';
import conversationListCtrl from './conversationListCtrl';

import conversationPageTemplate from './conversationPage.html';
import conversationPageCtrl from './conversationPageCtrl';

export default angular.module('yunity.conversation', [ySession, yConversation])
  .component('conversationListPage', {
    templateUrl: conversationListTemplate,
    controller: conversationListCtrl,
    controllerAs: 'ctrl'
  })
  .component('conversationPage', {
    templateUrl: conversationPageTemplate,
    controller: conversationPageCtrl,
    controllerAs: 'ctrl'
  })
  .name;
