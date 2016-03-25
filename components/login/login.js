import angular from 'angular';

angular.module('yunity.mobile').directive('loginPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/login/login.html',
    controller: ($scope, yAPI, yChat, $location) => {

      $scope.login = () => {

        console.log($scope);
        yAPI.authenticate({
          email: $scope.email,
          password: $scope.password,
          success: (res) => {
            console.log('login success');
            $location.path('/profile/' + res.data.user.id);
            yChat.initChats();
          },
          error: () => {
            alert('login failed');
          }
        });

      };

    }
  };
});

export default 'YunityLogin';