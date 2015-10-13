
angular.module('yunity.mobile').directive('yChatList', function() {
    return {
        scope: {},
        restrict: 'E',
        //template: '<h2>Hello Universe!</h2>',
        templateUrl: 'components/chat/chat-list.html',
        controller: function ($scope, yAPI) {

            yAPI.apiCall('/chats').then(ret => {
                console.log('chatlist', ret);
                $scope.chats = ret.data.chats;
            });

            /*
             * Initial API Call to gel list of conversations
             */
            console.log('get all chats');
            console.log(yAPI.session);
            if(yAPI.session.loggedin) {
                console.log('get all chats');
                yAPI.apiCall('/chats').then(function(ret){

                    $scope.chats = ret.data.chats;
                });
            }

        }
    }
});

angular.module('yunity.mobile').directive('yChat',
    function(yChat, $route) {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/chat/chat.html',
        controller: function ($scope, yAPI) {

            let chatId = $route.current.params.id;
            console.log(`/chats/${chatId}/messages`);
            yAPI.apiCall(`/chats/${chatId}/messages`).then((ret) => {
                console.log("ret", ret);
                let messages = ret.data.messages;
                $scope.chat = {
                    messages: messages,
                };
            });

            /**
             * send chat TEXT message function
             */
            $scope.sendmessage = function() {
                if($scope.inputtext !== undefined) {
                    yAPI.apiCall({
                        uri: '/chats/' + $scope.chat.id + '/messages',
                        method: 'POST',
                        data: {
                            chatid: $scope.chat.id,
                            body: {
                                type: 'TEXT',
                                content: $scope.inputtext
                            }
                        }
                    }).then(function(ret) {
                        console.log('chat send success');
                        console.log(ret);
                    }, function(ret) {
                        console.log('chat send failed');
                        console.log(ret);
                    });
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



angular.module('yunity.mobile').directive('yChatNew', function(yChat, $route) {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/chat/chat.html',
        controller: function ($scope, yAPI, $location) {

            let userIds = $route.current.params.userids.split(',').map(uid => parseInt(uid, 10));

            yAPI.getUsers(userIds).then((ret) => {
                console.log("USERS", ret);
            });

            let createChat = (participants, message) => {
                return yAPI.apiCall({
                    uri: '/chats/',
                    method: 'POST',
                    data: {
                        participants: participants,
                        message: message,
                    }
                });
            };

            /**
             * send chat TEXT message function
             */
            $scope.sendmessage = function() {
                if($scope.inputtext !== undefined) {
                    let message = {
                        content: $scope.inputtext,
                        type: "TEXT",
                    }
                    let allUserIds = [yAPI.session.user.id].concat(userIds);
                    console.log(' ALL USER IDS ', allUserIds);
                    createChat(allUserIds, message).then((ret) => {
                        let chatId = ret.data.id;
                        console.log("chat return", ret.data);
                        $location.path(`/chat/${chatId}`);
                    });
                }
            };

            /**
             * TO DO: returning correct path to avatar image
             */
            $scope.avatar = function(user_id) {
                return '/img/avatar.png';
            };

        }
    }
});


export default 'YunityChat';