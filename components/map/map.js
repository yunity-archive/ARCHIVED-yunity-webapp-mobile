import angular from 'angular';

angular.module('yunity.mobile').directive('mapPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/map/map.html',
    controller: ($scope, yAPI) => {
      $scope.state = {
        pins: []
      };
    },
    link: (element, $scope, attrs) => {

    }
  };
});
