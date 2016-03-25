import chatListTemplate from './chat-list.html';

const debug = require('debug')('yunity:component:y-chat-list');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: chatListTemplate,
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
}
