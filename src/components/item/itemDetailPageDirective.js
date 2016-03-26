import itemDetailPageTemplate from './itemDetailPage.html';

import itemDetailPageCtrl from './itemDetailPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: itemDetailPageTemplate,
    controller: itemDetailPageCtrl
  };
}
