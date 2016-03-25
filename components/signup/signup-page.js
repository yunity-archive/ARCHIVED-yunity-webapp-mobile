import signupTemplate from './signup.html';

let debug = require('debug')('yunity:signup-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: signupTemplate,
    controller: SignupPageCtrl,
    controllerAs: 'ctrl'
  };
}

class SignupPageCtrl {

  constructor($scope, yAPI, yChat, $location) {
    Object.assign(this, { $scope, yAPI, yChat, $location });
    this.data = {};
  }

  signup() {
    this.yAPI.apiCall({
      uri: '/users',
      method: 'POST',
      data: this.data
    }).then((res) => {
      let { email, password } = this.data;
      this.yAPI.authenticate({
        email, password,
        success: () => {
          debug('login success');
          this.$location.path('/profile/' + res.data.id);
          this.yChat.initChats();
        },
        error: () => {
          alert('login failed');
        }
      });

    }, () => {
      alert('error while signup');
    });
  }

}