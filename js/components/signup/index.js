import angular from 'angular';

import signupPage from './signupPageDirective';

export default angular.module('yunity.signup', [])
  .directive('signupPage', signupPage)
  .name;