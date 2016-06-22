import angular from 'angular';

import yAuth from '../../yunity.yAuth';
import yConversation from '../../yunity.yConversation';

import loginTemplate from './loginPage.html';
import loginPageCtrl from './loginPageCtrl';

export default angular.module('yunity.login', [yAuth, yConversation])
  .component('loginPage', {
    templateUrl: loginTemplate,
    controller: loginPageCtrl,
    controllerAs: 'ctrl'
  })
  .name;
