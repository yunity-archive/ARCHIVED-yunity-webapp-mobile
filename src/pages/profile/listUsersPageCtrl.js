const debug = require('debug')('yunity:listUsersPage');

export default class ListUsersPageCtrl {
  constructor(yAPI) {
    'ngInject';
    Object.assign(this, { yAPI });
    this.yAPI.apiCall('/users/').then((ret) => {
      debug(ret.data.users);
      this.users = ret.data.users;
    });
  }
}
