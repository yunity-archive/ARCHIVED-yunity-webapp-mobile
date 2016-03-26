import createItemPageTemplate from './createItemPage.html';

import createItemPageCtrl from './createItemPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: createItemPageTemplate,
    controller: createItemPageCtrl,
    controllerAs: 'ctrl'
  };
}
