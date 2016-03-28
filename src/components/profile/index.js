import angular from 'angular';

import profilePage from './profilePageDirective';
import listUsersPage from './listUsersPageDirective';

export default angular.module('yunity.profile', [])
  .directive('profilePage', profilePage)
  .directive('listUsersPage', listUsersPage)
  .name;