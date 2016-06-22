import angular from 'angular';
import yUser from '../../yunity.yUser';
import yAuth from '../../yunity.yAuth';
import yConversation from '../../yunity.yConversation';

import signupTemplate from './signupPage.html';

import signupPageCtrl from './signupPageCtrl';

export default angular.module('yunity.signup', [yUser, yAuth, yConversation])
  .component('signupPage', {
    templateUrl: signupTemplate,
    controller: signupPageCtrl,
    controllerAs: 'ctrl'
  })
  .name;
