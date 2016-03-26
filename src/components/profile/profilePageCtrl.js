const debug = require('debug')('yunity:profilePage');

export default class ProfilePageCtrl {
  constructor($rootScope, yAPI, yChat, $route, $location) {
    'ngInject';
    Object.assign(this, {
      $rootScope, yAPI, yChat, $route, $location,
      error: false,
      error_messag: '',
      user: {
        id: $route.current.params.id,
        loaded: false
      }
    });

    debug($route.current.params);

    yAPI.apiCall('/users/' + this.user.id).then((ret) => {
      this.user = ret.data.users[0];
      this.user.loaded = true;
      this.ownprofile = false;

      if(this.user.id == this.yAPI.session.user.id) {
        this.ownprofile = true;
      }


    }, () => {
      this.error = true;
      this.error_message = 'user not found';
    });

  }

  sendMessage() {
    var chat = this.yChat.getExistingChat(this.user.id, this.yAPI.session.chats);
    if(chat) {
      this.$location.path('/chat/' + chat.id);
    } else {
      this.$location.path('/chat/new/' + this.user.id );
    }
  }

}