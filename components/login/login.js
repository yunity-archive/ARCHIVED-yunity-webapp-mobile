
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
                    success: function(){
                        console.log('login success');
                        $location.path('/map');
                        yChat.initChats();
                    },
                    error: function() {
                        console.log('login failed');
                    }
                });

            };

        }
    };
});

export default 'YunityLogin';