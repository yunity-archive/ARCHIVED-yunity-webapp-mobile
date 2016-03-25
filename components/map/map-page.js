export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/map/map.html',
    controller: ($scope) => {
      $scope.state = {
        pins: []
      };
    }
  };
}