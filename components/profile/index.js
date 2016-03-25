import angular from 'angular';

import profilePage from './profile-page';
import listUsersPage from './list-users-page';

export default angular.module('yunity.profile', [])
  .directive('profilePage', profilePage)
  .directive('listUsersPage', listUsersPage)
  .name;