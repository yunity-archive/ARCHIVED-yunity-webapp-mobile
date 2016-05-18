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
    templateUrl: function(element, attr) {
      return (("create" in attr) ? postCreateTemplate
                                 : postTemplate);
    },
    link: function($scope, element, attr) {
      $scope.create = ("create" in attr);
      $scope.isReply = ("reply" in attr);
      
      if ($scope.create)
        // Set placeholder if creating new comment, with defaults depending
        // on whether user is creating a whole new post or is just replying.
        $scope.placeholder = (attr.placeholder ||
          ($scope.isReply ? "comment..."
                          : "write something amazing..."));
    }
  };
}
