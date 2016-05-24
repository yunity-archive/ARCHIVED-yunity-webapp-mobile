import yChatPageTemplate from './yChatPage.html';
import yChatPageCtrl from './yChatPageCtrl';

const debug = require('debug')('y-chat');

export default function() {
  debug('creating y-chat directive!');
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatPageTemplate,
    controller: yChatPageCtrl,
    controllerAs: 'ctrl'
  };
}