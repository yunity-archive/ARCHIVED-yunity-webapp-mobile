import mapTemplate from './mapPage.html';
import mapPageCtrl from './mapPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: mapTemplate,
    controller: mapPageCtrl,
    controllerAs: 'ctrl'
  };
}