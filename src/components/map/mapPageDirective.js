import mapTemplate from './mapPage.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: mapTemplate,
    controller: ($scope) => {
      'ngInject';
      $scope.state = {
        pins: []
      };
    }
  };
}