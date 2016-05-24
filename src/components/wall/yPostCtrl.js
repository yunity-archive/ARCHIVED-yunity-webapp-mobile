export default class PostCtrl {
  
  constructor($scope, $attrs, yAPI) {
    'ngInject';
    Object.assign(this, { $scope, yAPI });
    
    Object.assign($scope, {
      user: yAPI.session.user,
      create: ("create" in $attrs),
      isReply: ("reply" in $attrs)
    });
    
    if ($scope.create)
      // Set placeholder if creating new comment, with defaults depending
      // on whether user is creating a whole new post or is just replying.
      $scope.placeholder = ($attrs.placeholder ||
        ($scope.isReply ? "comment..."
                        : "write something amazing..."));
  }
  
}
