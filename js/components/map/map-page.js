import mapTemplate from './map.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: mapTemplate,
    controller: ($scope) => {
      $scope.state = {
        pins: []
      };
    }
  };
}