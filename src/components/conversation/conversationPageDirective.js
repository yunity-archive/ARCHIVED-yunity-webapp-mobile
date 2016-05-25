import conversationPageTemplate from './conversationPage.html';
import conversationPageCtrl from './conversationPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: conversationPageTemplate,
    controller: conversationPageCtrl,
    controllerAs: 'ctrl'
  };
}
