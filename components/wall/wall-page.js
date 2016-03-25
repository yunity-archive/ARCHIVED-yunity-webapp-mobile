export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/wall/wall.html',
    controller: ($scope) => {
      $scope.state = {
        posts: []
      };
    }
  }
}