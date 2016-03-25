import angular from 'angular';

import wallPage from './wall-page';

export default angular.module('yunity.wall', [])
  .directive('wallPage', wallPage)
  .name;