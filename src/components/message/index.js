import angular from 'angular';

import message from './yMessageDirective';

export default angular.module('yunity.message', [])
  .directive('yMessage', message)
  .name;
