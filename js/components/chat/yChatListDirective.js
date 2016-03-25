import yChatListTemplate from './yChatList.html';

const debug = require('debug')('yunity:component:y-chat-list');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatListTemplate,
    controller: ($scope, yAPI) => {
      'ngInject';

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
