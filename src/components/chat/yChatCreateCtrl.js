const debug = require('debug')('yunity:chat:create');

export default class YChatCreateCtrl {

  constructor(yAPI, yChat, $stateParams, $location) {
    'ngInject';
    Object.assign(this, {
      yAPI, yChat,
      $stateParams, $location,
      
      error: null,
      participants: [ yAPI.session.user ]
    });
    
    if (!yAPI.session.loggedIn) {
      this.error = 'Not logged in';
      return;
    }
    
    if ($stateParams.userids.length > 0) {
      
      // The set is used to detect if a user ID was specified more than once.
      const userIDSet = new Set();
      for (let userid of $stateParams.userids.split(',')) {
        userid = Number(userid);
        
        if (!Number.isSafeInteger(userid) ||
            (userid === yAPI.session.user.id)) {
          this.error = 'Invalid user ID';
          return;
        }
        if (userIDSet.has(userid)) {
          this.error = 'Duplicate user ID';
          return;
        }
        
        userIDSet.add(userid);
      }
      
      yAPI.apiCall('/users/' + $stateParams.userids)
        .then((ret) => {
          this.participants.push(...ret.data.users);
        }, (error) => {
          this.error = 'User(s) not found';
        });
      
    }
  }
  
  create() {
    if (this.error || (this.participants.length <= 1))
      return;
    
    this.yAChat.create("Created chat", this.participants.map((user) => user.id))
      .then((chatID) => { this.$location.path(`/chat/${chatID}`) })
      .catch((error) => { this.error = `Error during creation: ${error.response}`; });
  }
  
}
