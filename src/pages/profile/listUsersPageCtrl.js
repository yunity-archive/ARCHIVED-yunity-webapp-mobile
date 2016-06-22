const debug = require('debug')('yunity:listUsersPage');

export default class ListUsersPageCtrl {
  constructor(yUser) {
    'ngInject';
    Object.assign(this, {
      yUser
    });
    this.yUser.getUserList()
    .then((ret) => {
      debug(ret.data.users);
      this.users = ret.data.users;
    });
  }
}
