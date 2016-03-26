import yChatListTemplate from './yChatList.html';

import yChatListCtrl from './yChatListCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatListTemplate,
    controller: yChatListCtrl,
    controllerAs: 'ctrl'
  };
}
