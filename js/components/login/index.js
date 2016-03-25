import angular from 'angular';

import loginPage from './login-page';

export default angular.module('yunity.login', [])
  .directive('loginPage', loginPage)
  .name;