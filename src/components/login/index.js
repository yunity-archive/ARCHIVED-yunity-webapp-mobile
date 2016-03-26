import angular from 'angular';

import loginPage from './loginPageDirective';

export default angular.module('yunity.login', [])
  .directive('loginPage', loginPage)
  .name;