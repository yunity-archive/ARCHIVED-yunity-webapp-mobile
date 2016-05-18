import wallTemplate from './yWall.html';
import wallCtrl from './yWallCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: wallTemplate,
    controller: wallCtrl,
    controllerAs: 'ctrl'
  };
}
