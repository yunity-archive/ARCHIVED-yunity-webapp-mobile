
angular.module('yunity.mobile').directive('yCoversationList', function() {
    return {
        scope: {},
        restrict: 'E',
        //template: '<h2>Hello Universe!</h2>',
        templateUrl: 'components/chat/conversation-list.html',
        controller: function ($scope, yAPI) {
            $scope.conversations = [];

            /*
             * Initial API Call to gel list of conversations
             */
            yAPI.apiCall('/listconversations').then(function(ret){

               // console.log(ret);

                $scope.conversations = ret.data.data.conversations;
            });
        }
    }
});

angular.module('yunity.mobile').directive('yConversation', function() {
    return {
        scope: {},
        restrict: 'E',
        //template: '<h2>Hello Universe!</h2>',
        templateUrl: 'components/chat/conversation.html',
        controller: function ($scope, yAPI) {
            $scope.conv = [];

            /*
             * Initial API Call to gel list of messages..
             */
            yAPI.apiCall('/getconversation').then(function(ret){
                $scope.conv = ret.data;
            });
        }
    }
});


export default 'YunityChat';