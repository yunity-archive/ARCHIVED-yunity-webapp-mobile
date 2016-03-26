import groupPageTemplate from './groupPage.html';

const debug = require('debug')('yunity:component:groupPage');

import groupPageCtrl from './groupPageCtrl';

export default function() {
  debug('group page init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupPageTemplate,
    controller: groupPageCtrl,
    controllerAs: 'ctrl'
  };

}
