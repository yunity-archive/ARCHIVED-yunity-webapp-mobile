const debug = require('debug')('yunity:component:conversationPageCtrl');

export default class ConversationPageCtrl {

  constructor($scope, $stateParams, ySession, yConversation) {
    'ngInject';
    Object.assign(this, {
      $scope, $stateParams,
      ySession, yConversation,
      error: null
    });

    // $scope.loaded:  If false, prevents chat from being created or interacted with.
    // $scope.created: If false, interaction is handled differently.

    if ('userids' in $stateParams) {

      // Create new MULTICHAT conversation.
      debug('User is starting a new MULTICHAT conversation');

      const validationSet = new Set();
      const ownID   = this.ySession.getSession().user.id;
      const userIDs = $stateParams.userids.split(',').map((userID) => {
        userID = Number(userID);
        if (!Number.isSafeInteger(userID) ||
            (userID <= 0) || (userID === ownID)) {
          this.error = 'Invalid user ID';
          return;
        }
        if (validationSet.has(userID)) {
          this.error = 'Duplicate user ID';
          return;
        }
        validationSet.add(userID);
      });
      if (this.error) return;

      $scope.loaded  = true;
      $scope.created = false;
      $scope.placeholder  = 'send message to create conversation...';
      $scope.conversation = {
        type: 'MULTICHAT',
        participants: [ownID, ...userIDs]
      };

    } else if ('userid' in $stateParams) {

      // Open existing / create new ONE_ON_ONE chat with user.
      debug('User is starting a new ONE_ON_ONE chat');

      const userID = Number($stateParams.userid);

      $scope.loaded  = false;
      $scope.created = false;
      $scope.conversation = {
        type: 'ONE_ON_ONE'
      };

      this.yConversation.getChatForUser(userID)
        .then((conversation) => {
          $scope.loaded  = true;
          $scope.created = true;
          $scope.conversation = conversation;
          debug('Existing ONE_ON_ONE chat loaded');
        })
        .catch(() => {
          // TODO: Check if the custom error code is the correct one.
          $scope.loaded = true;
          $scope.placeholder = 'send message to create one-on-one chat...';
          debug('No existing ONE_ON_ONE chat found, starting new one');
        });

    } else if ('id' in $stateParams) {

      // Open existing conversation.

      const chatID = Number($stateParams.id);

      $scope.loaded  = false;
      $scope.created = false;

      this.yConversation.get(chatID)
        .then((conversation) => {
          $scope.loaded  = true;
          $scope.created = true;
          $scope.conversation = conversation;
          debug('Existing MULTICHAT conversation loaded');
        })
        .catch((error) => {
          this.error = 'Conversation not found';
          debug('Couldn\'t find existing MULTICHAT conversation', error);
        });

    } else {

      throw new Error('conversation directive used without id, userid ' +
                      'or userids state parameters being present');

    }
  }

}
