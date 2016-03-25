import loginTemplate from './loginPage.html';

const debug = require('debug')('yunity:component:login-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: loginTemplate,
    controller: ($scope, yAPI, yChat, $location) => {
      'ngInject';

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
          error: err => {
            debug('login failed', err);
          }
        });

      };

    }
  };
}