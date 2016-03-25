import angular from 'angular';

angular.module('yunity.mobile').directive('loginPage', function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/login/login.html',
    controller: function ($scope, yAPI, yChat, $location) {

      $scope.login = function () {

        console.log($scope);
        yAPI.authenticate({
          email: $scope.email,
          password: $scope.password,
          success: function(res){
            console.log('login success');
            $location.path('/profile/' + res.data.user.id);
            yChat.initChats();
          },
          error: function() {
            alert('login failed');
          }
        });

      };

    }
  };
});

export default 'YunityLogin';