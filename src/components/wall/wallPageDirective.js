import wallTemplate from './wallPage.html';
import wallPageCtrl from './wallPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: wallTemplate,
    controller: wallPageCtrl,
    controllerAs: 'ctrl'
  }
}