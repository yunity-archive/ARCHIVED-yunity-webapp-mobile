import angular from 'angular';

import yMapService from './yMapService';
import yMapDirective from './yMapDirective';

export default angular.module('yunity.yMap', [])
  .service('yMapService', yMapService)
  .directive('yMap', yMapDirective)
  .name;