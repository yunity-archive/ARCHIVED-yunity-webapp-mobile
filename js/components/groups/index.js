import angular from 'angular';

import groups from './groups';
import groupPage from './group-page';
import groupsAdd from './group-add';

export default angular.module('yunity.groups', [])
  .directive('groups', groups)
  .directive('groupPage', groupPage)
  .directive('groupsAdd', groupsAdd)
  .name;