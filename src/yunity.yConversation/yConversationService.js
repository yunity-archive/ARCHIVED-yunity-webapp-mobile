const debug = require('debug')('yunity:yChat');


class Conversation {
  
  constructor(controller, data) {
    Object.defineProperties(this, {
      // Non-enumerable, non-configurable properties.
      controller: { value: controller }
    });
    
    this.id    = data.id;
    this.type  = data.type;
    this.topic = data.topic;
    
    this.participants = data.participants;
    this.messages     = data.messages.map(
      (message) => new Message(this, message));
  }
  
}

class Message {
  
  constructor(conversation, data) {
    Object.defineProperties(this, {
      // Non-enumerable, non-configurable properties.
      conversation: { value: conversation }
    });
    
    this.content = data.content;
    this.author  = data.author;
    this.time    = new Date(data.time);
  }
  
}


export default class YConversation {
  
  constructor($q, $http, ySocket, yAPI) {
    'ngInject';
    Object.assign(this, {
      $q, $http, ySocket, yAPI,
      
      chatListeners: {}, // chatid -> [array, of listener functions]
      allListeners: [] // [array, of, listener, functions, for, all, chats]
      
    });
    
    this.ySocket.listen((data) => {
      
      let { type, payload } = data;
      
      if (type === 'chat_message') {
        let { chatId, message } = payload;
        let fns = this.chatListeners[chatId];
        if (fns) {
          fns.forEach((fn) => fn([message]));
        }
        this.allListeners.forEach((fn) => fn([message]));
      }
      
    });
    
  }
  
  
  /**
   * Gets all conversations, ordered by their most recent message.
   * The conversations will only contain the most recent message(s).
   * 
   * @returns {PromiseLike<Conversation[]>} Promise which resolves to an array of conversations.
   */
  getAll() {
    return this.yAPI.apiCall('/conversations')
      .then((response) => response.data.map(
        (data) => new Conversation(this, data)));
  }
  
  /**
   * Gets a conversation by its ID, including all of its messages.
   * 
   * @param {number} id ID of the conversation to get.
   * @returns {PromiseLike<Conversation>} Promise which resolves to the conversation.
   */
  get(id) {
    return this.yAPI.apiCall(`/conversation/${id}`)
      .then((response) => new Conversation(this, response.data));
  }
  
  /**
   * Creates a new MULTICHAT conversation with the specified participants.
   * 
   * @param {string} topic Initial topic of the conversation.
   * @param {number[]} participants Array of user IDs. Must contain the user's
   *                                own ID and have at least 2 participants.
   * @param {string|Object} message Initial message by the current user.
   * 
   * @returns {PromiseLike<Conversation>} Promise which resolves to the created conversation.
   */
  create(topic, participants, message) {
    if (typeof message === 'string')
      message = { content: message };
    return this.yAPI.apiCall({
      uri: '/conversations',
      data: { topic, participants, message }
    }).then((response) => new Conversation(this, response.data));
  }
  
  /**
   * Gets a conversation for the one-on-one chat between the current and the specified user.
   * 
   * @param {number} userID ID of the user.
   * 
   * @returns {PromiseLike<Conversation>} Promise which resolves to the conversation.
   */
  getChatForUser(userID) {
    return this.yAPI.apiCall(`/chat/${userID}`)
      .then((response) => new Conversation(this, response.data));
  }
  
  /**
   * Creates a new ONE_ON_ONE chat with the specified user.
   * There can only be one ONE_ON_ONE chat with any specific user.
   * 
   * @param {number} userID ID of the user to create a chat with.
   * @param {string|Object} message Initial message by the current user.
   * 
   * @returns {PromiseLike<Conversation>} Promise which resolves to the created conversation.
   */
  createChatForUser(userID, message) {
    if (typeof message === 'string')
      message = { content: message };
    return this.yAPI.apiCall({
      uri: `/chat/${userID}`,
      data: { message }
    }).then((response) => new Conversation(this, response.data));
  }
  
  /**
   * Sends a message to the specified conversation.
   * 
   * @param {number} id ID of the conversation.
   * @param {string|Object} message Message to be sent.
   * 
   * @returns {PromiseLike<Object>} Promise which resolves to the raw message data.
   */
  send(id, message) {
    if (typeof message === 'string')
      message = { content: message };
    return this.yAPI.apiCall({
      uri: `/conversation/${id}/messages`,
      data: message
    }).then((response) => {
      debug('Message sent:', response.data);
      return response.data;
    });
  }
  
  /**
   * Updates a conversation's data (such as the topic).
   * 
   * @param {number} id ID of the conversation.
   * @param {Object} data Object containing the fields to change.
   * 
   * @returns {PromiseLike<void>} Promise which resolves if the action was successful.
   */
  update(id, data) {
    return this.yAPI.apiCall({
      uri: `/conversation/${id}`,
      method: 'PUT',
      data
    });
  }
  
  /**
   * Adds the specified participants to a conversation.
   * It's not possible to modify participants of ONE_ON_ONE chats.
   * 
   * @param {number} id ID of the conversation.
   * @param {number[]} participants Array of participants to add.
   * 
   * @returns {PromiseLike<void>} Promise which resolves if the action was successful.
   */
  addParticipants(id, participants) {
    return this.yAPI.apiCall({
      uri: `/conversation/${id}/participants`,
      data: { participants }
    });
  }
  
  /**
   * Removes the specified participants from a conversation.
   * A normal user can only remove themself from a conversation.
   * It's not possible to modify participants of ONE_ON_ONE chats.
   * 
   * @param {number} id ID of the conversation.
   * @param {number[]} participants Array of participants to remove.
   * 
   * @returns {PromiseLike<void>} Promise which resolves if the action was successful.
   */
  removeParticipants(id, participants) {
    return this.yAPI.apiCall({
      uri: `/conversation/${id}/participants`,
      method: 'DELETE',
      data: { participants }
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
      
      this.loadInitialMessages(chatId).then((msgs) => {
        
        if (incoming.length > 0) {
          let minimumId = incoming[0].id;
          msgs = msgs.filter((msg) => msg.id < minimumId);
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
  
}
