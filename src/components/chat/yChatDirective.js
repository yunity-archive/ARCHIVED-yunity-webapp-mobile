import yChatTemplate from './yChat.html';
import yChatCtrl from './yChatCtrl';

const debug = require('debug')('y-chat');

export default function() {
  debug('creating y-chat directive!');
  return {
    scope: {},
    restrict: 'E',
    templateUrl: yChatTemplate,
    controller: yChatCtrl,
    controllerAs: 'ctrl'
  };
}