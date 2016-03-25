import angular from 'angular';

import mapPage from './map-page';

export default angular.module('yunity.map', [])
  .directive('mapPage', mapPage)
  .name;