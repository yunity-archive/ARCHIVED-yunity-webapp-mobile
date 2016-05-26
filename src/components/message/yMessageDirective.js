import messageTemplate from './yMessage.html';
import messageCreateTemplate from './yMessageCreate.html';
import messageCtrl from './yMessageCtrl';

export default function() {
  return {
    scope: {
      message: '=',
      type: '@',
      placeholder: '@'
    },
    transclude: true,
    restrict: 'E',
    controller: messageCtrl,
    controllerAs: 'ctrl',
    templateUrl: function(element, $attrs) {
      return (("create" in $attrs) ? messageCreateTemplate
                                   : messageTemplate);
    }
  };
}
