import angular from 'angular';

import mapPage from './mapPageDirective';

export default angular.module('yunity.map', [])
  .directive('mapPage', mapPage)
  .name;