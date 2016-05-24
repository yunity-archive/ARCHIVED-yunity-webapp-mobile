import postTemplate from './yPost.html';
import postCreateTemplate from './yPostCreate.html';
import postCtrl from './yPostCtrl';

export default function() {
  return {
    scope: {
      post: '='
    },
    restrict: 'E',
    controller: postCtrl,
    controllerAs: 'ctrl',
    templateUrl: function(element, $attrs) {
      return (("create" in $attrs) ? postCreateTemplate
                                   : postTemplate);
    }
  };
}
