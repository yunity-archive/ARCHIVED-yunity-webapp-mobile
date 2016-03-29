const debug = require('debug')('yunity:yChat');

export default class YChat {

  constructor($q, $http, ySocket, yAPI) {
    'ngInject';
    Object.assign(this, {
      $q, $http, ySocket, yAPI,

      chatListeners: {}, // chatid -> [array, of listener functions]
      allListeners: [] // [array, of, listener, functions, for, all, chats]

    });

    this.ySocket.listen(data => {

      let {type, payload} = data;

      if (type === 'chat_message') {
        let {chatId, message} = payload;
        let fns = this.chatListeners[chatId];
        if (fns) {
          fns.forEach(fn => fn([message]));
        }
        this.allListeners.forEach(fn => fn([message]));
      }

    });

  }

  loadInitialMessages(chatId) {
    return this.yAPI.apiCall(`/chats/${chatId}/messages/`).then(response => {
      return response.data.messages.reverse();
    });
  }

  getChatForUser(userId) {
    return this.yAPI.apiCall({
      uri: `/users/${userId}/chat/`,
      method: 'POST'
    }).then(response => {
      return response.data.chat;
    });
  }

  // TODO: add options, include how many historic messages to get
  // default as none?

  listen(chatId, fn) {

    let loadedInitialMessages = false;

    // store messages from socket here until we've loaded existing via API
    let incoming = [];

    let listener = (msgs) => {
      if (loadedInitialMessages) {
        fn(msgs);
      } else {
        incoming.push.apply(incoming, msgs);
      }
    };

    if (!this.chatListeners[chatId]) this.chatListeners[chatId] = [];
    this.chatListeners[chatId].push(listener);


    this.ySocket.ensureConnected().then(() => {

      // ensure we are connected before we make the API request

      // otherwise messages created after the API req but
      // before socket connect will not be seen

      this.loadInitialMessages(chatId).then(msgs => {

        if (incoming.length > 0) {
          let minimumId = incoming[0].id;
          msgs = msgs.filter(msg => msg.id < minimumId);
        }
        if (msgs.length > 0) {
          fn(msgs);
        }
        if (incoming.length > 0) {
          fn(incoming.slice());
        }
        incoming.length = 0; // empty the tmp array
        loadedInitialMessages = true;
      });

    });

    return () => { // unlisten fn
      let fns = this.chatListeners[chatId];
      if (!fns) return;
      let idx = fns.indexOf(listener);
      if (idx) {
        fns.splice(idx, 1);
        if (fns.length === 0) {
          delete this.chatListeners[chatId];
        }
      }
    };

  }

  sendMessage(chatId, msg) {
    return this.yAPI.apiCall({
      uri: `/chats/${chatId}//messages`,
      method: 'POST',
      data: msg
    }).then(response => {
      debug('sent message!', response.data);
      return;
    }, err => {
      debug('error sending chat message', err);
      return;
    });
  }

  /**
  * checks if 1 to 1 chat with given user id exists already
  *
  * @param userId
  * @param chats[]
  *
  * @return null | object chat
  */
  getExistingChat(userId,chats) {

    for(let chat of chats) {
      if(chat.participants.length === 2) {

        for(let part of chat.participants) {
          if(part === userId) {
            return chat;
          }
        }

      }
    }

    return null;
  }

  initChats() {

    debug('init chats');
    this.yAPI.apiCall('/chats').then((ret) => {
      this.yAPI.session.chats = ret.data.chats;

      this.listenAll((msgs) => {
        debug('todo: sync messages', msgs);

        // TO DO: sync messages with yApi.Session messages...
      });

    });
  }

  listenAll(fn) {

    this.allListeners.push(fn);

    return () => { // unlisten fn
      let idx = this.allListeners.indexOf(fn);
      if (idx) {
        this.allListeners.splice(idx, 1);
      }
    };

  }

  getAllChats() {

    return this.yAPI.apiCall('/chats');

  }

}