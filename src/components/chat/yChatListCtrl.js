const debug = require('debug')('yunity:component:yChatListCtrl');

export default class YChatListCtrl {
  
  constructor(yAPI) {
    'ngInject';
    Object.assign(this, { yAPI });
    
    this.chats = [];
    
    debug('get all chats');
    debug(yAPI.session);
    
    if (yAPI.session.loggedIn) {
      debug('get all chats');
      yAPI.apiCall('/chats').then((ret) => {
        debug('got chats', ret);
        this.chats = ret.data.chats;
      });
    }
    
  }
  
}
