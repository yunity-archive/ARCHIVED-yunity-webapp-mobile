import angular from 'angular';

import logoutPage from './logoutPageDirective';

export default angular.module('yunity.logout', [])
  .directive('logoutPage', logoutPage)
  .name;
