
angular.module('yunity.mobile').directive('yChatList', function() {
    return {
        scope: {},
        restrict: 'E',
        //template: '<h2>Hello Universe!</h2>',
        templateUrl: 'components/chat/chat-list.html',
        controller: function ($scope, yAPI) {

            $scope.chats = [
                {
                    id: 1,
                    name: "Peter",
                    online: true
                },
                {
                    id: 2,
                    name: "Petra",
                    online: false
                },
            ];

            /*
             * Initial API Call to gel list of conversations
             */
            console.log('get all chats');
            console.log(yAPI.session);
            if(yAPI.session.loggedin) {
                console.log('get all chats');
                yAPI.apiCall('/chats').then(function(ret){
                    console.log('got chats', ret);
                    $scope.chats = ret.data.chats;
                });
            }

        }
    }
});

angular.module('yunity.mobile').directive('yChat', function(yChat, yAPI, $route, $routeParams, $timeout) {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/chat/chat.html',
        link: ($scope, el, attrs) => {

            let containerEl = document.getElementById('chat-container'); // FIXME(ns) this should not be find-by-id...
            let scrollable = angular.element(containerEl).controller('scrollableContent');

            let userId = $routeParams.id;

            $scope.messages = [];

            yChat.getChatForUser(userId).then(chat => {
                $scope.chat = chat;
                yChat.listen($scope.chat.id, msgs => {
                    $timeout(() => {
                        msgs.forEach(msg => {
                            $scope.messages.push(msg);
                        });
                        $timeout(() => {
                            scrollable.scrollTo(containerEl.scrollHeight);
                        });
                    });
                });
            });

            $scope.sendMessage = function() {
                if ($scope.content) {
                    let msg = { content: $scope.content };
                    $scope.content = '';
                    yChat.sendMessage($scope.chat.id, msg);
                }
            };

            /**
             * TO DO: returning correct path to avatar image
             */
            $scope.avatar = function(user_id) {
                return '/img/avatar.png';
            };

            /**
             * TO DO: returns user object and handle users to store them in memory
             *
             * @param id
             */
            $scope.getUser = function(id) {

                /*
                 so like

                 if(this.users[id] != undefined) {
                 return this.users[id]
                 } else {
                 yAPI.apiCall('/user/' + id).then(function(){
                 ...
                 });
                 }

                 */

                return {
                    id: 12,
                    name: "Uwe"
                };
            };

        }
    }
});


export default 'YunityChat';
