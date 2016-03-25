import wallTemplate from './wall.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: wallTemplate,
    controller: ($scope) => {
      $scope.state = {
        posts: []
      };
    }
  }
}