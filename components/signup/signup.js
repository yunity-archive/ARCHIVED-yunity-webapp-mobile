
angular.module('yunity.mobile').directive('signupPage', function() {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/signup/signup.html',
        controller: function ($scope, yAPI, $location) {

            $scope.signup = function() {

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
                }).then(function(res){

                        //success('signup successfull :)');
                        //alert(res.data.id);
                       yAPI.authenticate({
                            email: $scope.email,
                            password: $scope.password,
                            success: function(){
                                console.log('login success');
                                $location.path('/profile/' + res.data.id);
                                yChat.initChats();
                            },
                            error: function() {
                                alert('login failed');
                            }
                        });

                },function(){
                    alert('error while signup');
                });
            }

        }
    };
});

export default 'YunitySignup';
