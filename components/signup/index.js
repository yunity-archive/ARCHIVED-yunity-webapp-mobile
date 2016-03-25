import angular from 'angular';

import signupPage from './signup-page';

export default angular.module('yunity.signup', [])
  .directive('signupPage', signupPage)
  .name;