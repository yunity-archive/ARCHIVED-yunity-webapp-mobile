import signupTemplate from './signup.html';

let debug = require('debug')('yunity:signup-page');

export default function() {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: signupTemplate,
    controller: ($scope, yAPI, yChat, $location) => {

      $scope.signup = () => {

        yAPI.apiCall({
          uri: '/users',
          method: 'POST',
          data: {
            email: $scope.email,
            password: $scope.password,
            display_name: $scope.displayname,
            first_name: $scope.firstname,
            last_name: $scope.lastname
          }
        }).then((res) => {

          //success('signup successfull :)');
          //alert(res.data.id);
          yAPI.authenticate({
            email: $scope.email,
            password: $scope.password,
            success: () => {
              debug('login success');
              $location.path('/profile/' + res.data.id);
              yChat.initChats();
            },
            error: () => {
              alert('login failed');
            }
          });

        }, () => {
          alert('error while signup');
        });
      };

    }
  };
}
