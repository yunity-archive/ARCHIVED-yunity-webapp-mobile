
angular.module('YunityWall', []).directive('wallPage', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/wall/wall.html',
        controller: function ($scope, yAPI) {
            $scope.state = {
                posts: []
            };

            yAPI.apiCall('/wall-posts').then(res => {
                $scope.state.posts = res.data.data.posts;
            });
        },
        // link: function (element, $scope, attrs) {

        // }
    }
});

export default 'YunityWall';