const debug = require('debug')('yunity:component:conversationPageCtrl');

export default class ConversationPageCtrl {
  
  constructor($attrs, $scope, $timeout, $stateParams, yConversation) {
    'ngInject';
    Object.assign(this, {
      $attrs, $scope, $timeout, $stateParams,
      yConversation
    });
    
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
