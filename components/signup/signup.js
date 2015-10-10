
angular.module('yunity.mobile').directive('signupPage', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/signup/signup.html',
        controller: function ($scope, yAPI) {

            $scope.signup = function() {

                yAPI.apiCall({
                    uri: '/user',
                    data: {
                        email: $scope.email,
                        password: $scope.password,
                        displayname: $scope.displayname
                    }
                }).then(res => {
                    $scope.state.posts = res.data.data.posts;
                });
            }

        }
    };
});

export default 'YunitySignup';