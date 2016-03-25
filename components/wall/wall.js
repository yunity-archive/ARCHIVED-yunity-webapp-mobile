import angular from 'angular';

angular.module('yunity.mobile').directive('wallPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/wall/wall.html',
    controller: ($scope, yAPI) => {
      $scope.state = {
        posts: []
      };
      /*
      yAPI.apiCall('/wall-posts').then(res => {
      $scope.state.posts = res.data.data.posts;
    });
    */
  },
  // link: function (element, $scope, attrs) {

  // }
}
});
