import angular from 'angular';

import wall from './yWallDirective';

export default angular.module('yunity.wall', [])
  .directive('yWall', wall)
  .name;
