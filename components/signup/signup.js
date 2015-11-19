
angular.module('yunity.mobile').directive('signupPage', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/signup/signup.html',
        controller: function ($scope, yAPI) {

            $scope.signup = function() {

                yAPI.apiCall({
                    uri: '/user/',
                    method: 'POST',
                    data: {
                        email: $scope.email,
                        password: $scope.password,
                        display_name: $scope.displayname
                    }
                }).then(function(res){

                        alert('signup successfull :)');

                });
            }

        }
    };
});

export default 'YunitySignup';