const debug = require('debug')('yunity:component:loginPage');

export default class LoginPageCtrl {

  constructor(yAPI, yChat, $location) {
    'ngInject';
    Object.assign(this, {
      yAPI, yChat, $location,
      data: {
        email: '',
        password: ''
      }
    });

  }

  login() {
    return this.yAPI.authenticate(Object.assign({
      success: (res) => {
        debug('login success');
        this.$location.path('/profile/' + res.data.user.id);
        this.yChat.initChats();
      },
      error: err => {
        debug('login failed', err);
      }
    }, this.data));
    /*
    */
  }

}
