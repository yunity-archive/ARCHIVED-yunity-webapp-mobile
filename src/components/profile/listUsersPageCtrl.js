const debug = require('debug')('yunity:listUsersPage');

import isabellaPng from '../chat/images/Isabella.png';

export default class ListUsersPageCtrl {
  constructor(yAPI) {
    'ngInject';
    Object.assign(this, { yAPI });
    this.yAPI.apiCall('/users/').then((ret) => {
      debug(ret.data.users);
      this.users = ret.data.users;
      this.users.forEach((user) => {
        user.avatarUrl = isabellaPng;
      });
    });
  }
}