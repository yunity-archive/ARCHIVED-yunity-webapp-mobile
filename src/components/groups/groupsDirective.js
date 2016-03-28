import groupsTemplate from './groups.html';

const debug = require('debug')('yunity:component:groups');

import groupsCtrl from './groupsCtrl';

export default function() {

  debug('groups init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupsTemplate,
    controller: groupsCtrl,
    controllerAs: 'ctrl'
  }
}