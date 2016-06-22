const debug = require('debug')('yunity:ySession');

export default class YSession {
  constructor() {
    'ngInject';

    this.session = {
      loggedIn: false,
      user: {},
      chats: []
    };

    debug('ySessionService initialized');
  }

  getSession() {
    debug('getting session', this);
    return this.session;
  }

  setSession(user) {
    debug('setting session');
    this.session = {
      loggedIn: true,
      user,
      chats: []
    };
  }

  clearSession() {
    debug('clearing session', this.session);
    this.session = {
      loggedIn: false,
      user: {},
      chats: []
    };
  }

}
