import logoutTemplate from './logoutPage.html';
import logoutPageCtrl from './logoutPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: logoutTemplate,
    controller: logoutPageCtrl,
    controllerAs: 'ctrl'
  };
}
