import angular from 'angular';

let debug = require('debug')('yunity:component:chat');

angular.module('yunity.mobile').directive('yChatList', () => {
  return {
    scope: {},
    restrict: 'E',
    //template: '<h2>Hello Universe!</h2>',
    templateUrl: 'components/chat/chat-list.html',
    controller: ($scope, yAPI) => {

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
        }
      ];

      /*
      * Initial API Call to gel list of conversations
      */
      debug('get all chats');
      debug(yAPI.session);
      if(yAPI.session.loggedin) {
        debug('get all chats');
        yAPI.apiCall('/chats').then((ret) => {
          debug('got chats', ret);
          $scope.chats = ret.data.chats;
        });
      }

    }
  };
});

angular.module('yunity.mobile').directive('yChat', (yChat, yAPI, $route, $routeParams, $timeout) => {
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

      $scope.sendMessage = () => {
        if ($scope.content) {
          let msg = { content: $scope.content };
          $scope.content = '';
          yChat.sendMessage($scope.chat.id, msg);
        }
      };

      /**
      * TO DO: returning correct path to avatar image
      */
      $scope.avatar = (user_id) => {
        return '/img/avatar.png';
      };

      /**
      * TO DO: returns user object and handle users to store them in memory
      *
      * @param id
      */
      $scope.getUser = (id) => {

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
