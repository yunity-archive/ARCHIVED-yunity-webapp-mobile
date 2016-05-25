const debug = require('debug')('yunity:component:conversationPageCtrl');

export default class ConversationPageCtrl {
  
  constructor($scope, $timeout, $stateParams, yAPI, yConversation) {
    'ngInject';
    Object.assign(this, {
      $scope, $timeout, $stateParams,
      yAPI, yConversation,
      error: null
    });
    
    // $scope.loaded:  If false, prevents chat from being created or interacted with.
    // $scope.created: If false, interaction is handled differently.
    
    if ('userids' in $stateParams) {
      
      // Create new MULTICHAT conversation.
      debug('User is starting a new MULTICHAT conversation');
      
      const validationSet = new Set();
      const ownID   = yAPI.session.user.id;
      const userIDs = $stateParams.userids.split(',').map((userID) => {
        if (this.error) return;
        userID = Number(userID);
        if (!Number.isSafeInteger(userID) ||
            (userid <= 0) || (userID === ownID)) {
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
      $scope.conversation = {
        type: 'MULTICHAT',
        participants: [ ownID, ...userIDs ]
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
      
      yConversation.getChatForUser(userID)
        .then((conversation) => {
          $scope.loaded  = true;
          $scope.created = true;
          $scope.conversation = conversation;
          debug('Existing ONE_ON_ONE chat loaded');
        })
        .catch((error) => {
          // TODO: Check if the custom error code is the correct one.
          $scope.loaded = true;
          debug('No existing ONE_ON_ONE chat found, starting new one');
        });
      
    } else if ('id' in $stateParams) {
      
      // Open existing conversation.
      
      const chatID = Number($stateParams.id);
      
      $scope.loaded  = false;
      $scope.created = false;
      
      yConversation.get(chatID)
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
    
    /*
    $scope.conversation = {
      id: 1,
      type: 'ONE_ON_ONE',
      topic: '',
      participants: [ 1, 2 ],
      messages: [
        { content: "Hey", time: new Date() }
      ],
      get title() { return this.topic; }
    };
    */
    
    $scope.conversation = {
      id: 2,
      type: 'MULTICHAT',
      topic: 'Testing multichat ...',
      participants: [ 2, 1 ],
      messages: [
        {
          media: '/images/Isabella.png',
          content: 'How you doin\'?',
          time: new Date(2016, 5, 24, 10, 6)
        },
        {
          user: { isSelf: true },
          media: '/images/Bodhi.png',
          content: 'Pretty good, thanks. Starting to work on some cool stuff.',
          time: new Date(2016, 5, 24, 11, 53)
        },
        {
          user: { isSelf: true },
          media: '/images/Bodhi.png',
          content: 'What have you been up to?',
          time: new Date(2016, 5, 24, 12, 9)
        },
        {
          media: '/images/Isabella.png',
          content: 'You know, doing things.',
          time: new Date(2016, 5, 24, 12, 40)
        },
        {
          user: { isSelf: true },
          media: '/images/Bodhi.png',
          content: 'Cool cool. So, you like stuff?',
          time: new Date(2016, 5, 24, 14, 21)
        },
        {
          media: '/images/Isabella.png',
          content: 'I guess.',
          time: new Date(2016, 5, 24, 14, 58)
        }
      ].reverse(),
      get title() { return this.topic; }
    };
  }
  
}
