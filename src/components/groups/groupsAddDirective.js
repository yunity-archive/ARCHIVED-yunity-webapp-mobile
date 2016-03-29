import groupsAddTemplate from './groupsAdd.html';

import groupsAddCtrl from './groupsAddCtrl';

export default function() {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupsAddTemplate,
    controller: groupsAddCtrl,
    controllerAs: 'ctrl'
  };
}