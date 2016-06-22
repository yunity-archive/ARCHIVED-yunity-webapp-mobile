const debug = require('debug')('yunity:component:loginPage');

export default class LoginPageCtrl {

  constructor(yAuth, yConversation, $location) {
    'ngInject';
    Object.assign(this, {
      yAuth, yConversation, $location,
      data: {
        email: '',
        password: ''
      }
    });
  }

  login() {
    debug('start login');

    this.yAuth.authenticate(this.data)
    .then((res) => {
      debug('login success', res);
      this.$location.path('/profile/' + res.data.id);
      this.yConversation.initChats();
    })
    .catch((err) => {
      debug('login failed', err);
    });
  }

}
