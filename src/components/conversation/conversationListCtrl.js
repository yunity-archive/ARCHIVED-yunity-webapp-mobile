const debug = require('debug')('yunity:component:conversationListCtrl');

export default class ConversationListCtrl {
  
  constructor($scope, yAPI, yConversation, $timeout) {
    'ngInject';
    Object.assign(this, {
      $scope,
      yAPI, yConversation
    });
    
    $scope.conversations = [
      {
        id: 1,
        type: 'ONE_ON_ONE',
        topic: '',
        participants: [ 1, 2 ],
        messages: [
          { content: "Hey", time: new Date() }
        ],
        get title() { return this.topic; }
      },
      {
        id: 2,
        type: 'MULTICHAT',
        topic: 'Testing multichat ...',
        participants: [ 2, 1 ],
        messages: [
          { content: "How you doin'?", time: new Date(2016, 5, 24, 10, 6) }
        ],
        get title() { return this.topic; }
      }
    ];
    
    $timeout(() => { $scope.conversations[1].topic = "Topic changed :P"; }, 3000);
    
    /*
    debug('Getting all conversations...');
    yConversation.getAll().then((conversations) => {
      debug('Got conversations:', conversations);
      $scope.conversations = conversations;
    });
    */
    
  }
  
}
