import angular from 'angular';

import yUser from '../../yunity.yUser';
import ySession from '../../yunity.ySession';

import profileTemplate from './profilePage.html';
import profilePageCtrl from './profilePageCtrl';

import listUsersTemplate from './listUsersPage.html';
import listUsersPageCtrl from './listUsersPageCtrl';

export default angular.module('yunity.profile', [yUser, ySession])
  .component('profilePage', {
    templateUrl: profileTemplate,
    controller: profilePageCtrl,
    controllerAs: 'ctrl'
  })
  .component('listUsersPage', {
    templateUrl: listUsersTemplate,
    controller: listUsersPageCtrl,
    controllerAs: 'ctrl'
  })
  .name;
