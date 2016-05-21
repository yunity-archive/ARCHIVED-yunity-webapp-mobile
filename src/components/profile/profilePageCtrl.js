const debug = require('debug')('yunity:profilePage');

export default class ProfilePageCtrl {
  
  constructor($rootScope, yAPI, yChat, $stateParams, $location) {
    'ngInject';
    Object.assign(this, {
      $rootScope, yAPI, yChat, $stateParams, $location,
      error: false,
      errorMessage: '',
      user: {
        id: $stateParams.id,
        loaded: false
      },
      ownProfile: ($stateParams.id == yAPI.session.user.id)
    });
    
    debug('profile page params', $stateParams);
    
    yAPI.apiCall('/users/' + this.user.id).then((ret) => {
      this.user = ret.data.users[0];
      this.user.loaded = true;
    }, () => {
      this.error = true;
      this.errorMessage = 'user not found';
    });
    
  }
  
  sendMessage() {
    let chat = this.yChat.getExistingChat(this.user.id, this.yAPI.session.chats);
    if (chat) {
      this.$location.path('/chat/' + chat.id);
    } else {
      this.$location.path('/chat/new/' + this.user.id );
    }
  }
  
}
