
angular.module('yunity.mobile').directive('mapPage', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/map/map.html',
        controller: function ($scope, yAPI) {
            $scope.state = {
                pins: []
            };
        },
        link: function (element, $scope, attrs) {

        }
    }
});
