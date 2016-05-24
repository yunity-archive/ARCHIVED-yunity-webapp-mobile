import yChatCreateTemplate from './yChatCreate.html';
import yChatCreateCtrl from './yChatCreateCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatCreateTemplate,
    controller: yChatCreateCtrl,
    controllerAs: 'ctrl'
  };
}
