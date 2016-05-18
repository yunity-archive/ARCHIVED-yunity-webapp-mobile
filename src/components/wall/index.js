import angular from 'angular';

import wall from './yWallDirective';
import post from './yPostDirective';

export default angular.module('yunity.wall', [])
  .directive('yWall', wall)
  .directive('yPost', post)
  .name;
