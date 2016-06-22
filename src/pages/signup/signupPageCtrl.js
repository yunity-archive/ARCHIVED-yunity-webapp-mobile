const debug = require('debug')('yunity:signupPageCtrl');

export default class SignupPageCtrl {

  constructor($scope, yUser, yAuth, yConversation, $location) {
    'ngInject';
    Object.assign(this, {
      $scope, yUser, yAuth, yConversation, $location
    });
    this.data = {};
  }

  signup() {
    this.yUser.createUser(this.data)
    .then((res) => {
      let { email, password } = this.data;
      this.yAuth.authenticate({
        email, password,
        success: () => {
          debug('login success', res);
          this.$location.path('/');
          this.yConversation.initChats();
        },
        error: (err) => {
          debug('login failed', err);
        }
      });
    }, (err) => {
      debug('error while signup', err);
    });
  }

}
