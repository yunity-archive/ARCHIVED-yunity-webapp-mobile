import angular from 'angular';

let debug = require('debug')('yunity:component:login');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/login/login.html',
    controller: ($scope, yAPI, yChat, $location) => {

      $scope.login = () => {

        debug($scope);
        yAPI.authenticate({
          email: $scope.email,
          password: $scope.password,
          success: (res) => {
            debug('login success');
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
}