import angular from 'angular';

import groups from './groupsDirective';
import groupPage from './groupPageDirective';
import groupsAdd from './groupsAddDirective';

export default angular.module('yunity.groups', [])
  .directive('groups', groups)
  .directive('groupPage', groupPage)
  .directive('groupsAdd', groupsAdd)
  .name;