
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

                    $scope.chats = ret.data.chats;
                });
            }

        }
    }
});

angular.module('yunity.mobile').directive('yChat', function(yChat, $route) {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: 'components/chat/chat.html',
        controller: function ($scope, yAPI) {



            /*
             * init Conversation List
             */
            $scope.chat = {
                id: 12,
                name: "Uwe",
                last_activity: "before 1 minute",
                messages: []
            };


            /**
             * send chat TEXT message function
             */
            $scope.sendMessage = function() {
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


export default 'YunityChat';
