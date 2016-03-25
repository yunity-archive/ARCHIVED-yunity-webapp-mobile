import angular from 'angular';

angular.module('yunity.mobile').directive('signupPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/signup/signup.html',
    controller: ($scope, yAPI, $location) => {

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
              console.log('login success');
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
});

export default 'YunitySignup';
