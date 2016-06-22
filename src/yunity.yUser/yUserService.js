const debug = require('debug')('yunity:yUser');

export default class YUser {

  constructor(yAPI, yConversation) {
    'ngInject';
    Object.assign(this, {
      yAPI, yConversation
    });

    debug('yUser service initialized.');
  }

  createUser(data) {
    return this.yAPI.apiCall({
      uri: '/users',
      method: 'POST',
      data
    });
  }

  getUserList() {
    return this.yAPI.apiCall('/users');
  }

  getUserProfile(userID) {
    return this.yAPI.apiCall('/users/' + userID);
  }

}
