
angular.module('yunity.mobile').directive('profilePage', function() {

    console.log('profile init');

    return {
        scope: {
            userid: '@'
        },
        restrict: 'E',
        templateUrl: 'components/profile/profile.html',
        controller: function ($scope, yAPI, yChat, $route, $location) {

            $scope.error = false;
            $scope.error_message = '';

            var user = {
                id: $scope.userid,
                loaded: false
            };

            yAPI.apiCall('/user/' + user.id).then(function(ret){
                $scope.user = ret.data.user;
                $scope.user.loaded = true;
            },function(ret){
                $scope.error = true;
                $scope.error_message = 'user not found';
            });

            $scope.sendMessage = function() {

                var chat = yChat.getExistingChat($scope.user.id,yAPI.session.chats);

                if(chat) {
                    $location.path('/chat/' + chat.id);
                } else {
                    $location.path('/chat/new/' + $scope.user.id );
                }

            };
        }
    }
});

export default 'YunityProfile';