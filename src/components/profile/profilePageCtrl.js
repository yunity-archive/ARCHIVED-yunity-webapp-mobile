const debug = require('debug')('yunity:profilePage');

export default class ProfilePageCtrl {
  
  constructor($scope, $attrs, yAPI, yChat, $stateParams, $location) {
    'ngInject';
    Object.assign(this, {
      $scope, $location,
      yAPI, yChat,
      
      error: null
    });
    
    const own = ("own" in $attrs);
    const userID = (own ? yAPI.session.user.id : $stateParams.id);
    
    Object.assign($scope, {
      user: { id: userID, loaded: false },
      ownProfile: (userID == yAPI.session.user.id)
    })
    
    yAPI.apiCall('/users/' + userID)
      .then((ret) => {
        $scope.user = ret.data.users[0];
        $scope.user.loaded = true;
      })
      .catch((error) => {
        this.error = 'User not found';
      });
    
  }
  
  sendMessage() {
    const chat = this.yChat.getExistingChat(this.$scope.user.id, this.yAPI.session.chats);
    if (chat) {
      this.$location.path('/chat/' + chat.id);
    } else {
      this.$location.path('/chat/new/' + this.$scope.user.id );
    }
  }
  
}
