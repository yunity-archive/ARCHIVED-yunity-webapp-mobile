const debug = require('debug')('yunity:component:conversationListCtrl');

export default class ConversationListCtrl {

  constructor($scope, yAPI, yConversation) {
    'ngInject';
    Object.assign(this, {
      $scope,
      yAPI, yConversation
    });

    debug('Getting all conversations...');
    yConversation.getAll().then((conversations) => {
      debug('Got conversations:', conversations);
      $scope.conversations = conversations;
    });


  }

}
