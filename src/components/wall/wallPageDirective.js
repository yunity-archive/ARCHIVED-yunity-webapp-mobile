import wallTemplate from './wallPage.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: wallTemplate,
    controller: ($scope) => {
      'ngInject';
      $scope.state = {
        posts: []
      };
    }
  }
}