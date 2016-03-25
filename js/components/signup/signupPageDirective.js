import signupTemplate from './signupPage.html';

const debug = require('debug')('yunity:signup-page');

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
    'ngInject';
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
        error: err => {
          debug('login failed', err);
        }
      });

    }, err => {
      debug('error while signup', err);
    });
  }

}