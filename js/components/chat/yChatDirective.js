import yChatTemplate from './yChat.html';
import yChatCtrl from './yChatCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatTemplate,
    controller: yChatCtrl,
    controllerAs: 'ctrl'
  };
}