const debug = require('debug')('yunity:component:conversationListCtrl');

export default class ConversationListCtrl {

  constructor($scope, yConversation) {
    'ngInject';
    Object.assign(this, {
      $scope,
      yConversation
    });

    debug('Getting all conversations...');
    this.yConversation.getAll().then((conversations) => {
      debug('Got conversations:', conversations);
      this.$scope.conversations = conversations;
    });


  }

}
