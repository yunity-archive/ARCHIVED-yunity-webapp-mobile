import conversationListTemplate from './conversationList.html';
import conversationListCtrl from './conversationListCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: conversationListTemplate,
    controller: conversationListCtrl,
    controllerAs: 'ctrl'
  };
}
