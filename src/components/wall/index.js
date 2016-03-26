import angular from 'angular';

import wallPage from './wallPageDirective';

export default angular.module('yunity.wall', [])
  .directive('wallPage', wallPage)
  .name;