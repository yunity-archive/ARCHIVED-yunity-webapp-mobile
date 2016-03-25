
let debug = require('debug')('yunity:profile:profile-page');

export default function() {

  debug('profile init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/profile/profile.html',
    controller: ($scope, $rootScope, yAPI, yChat, $route, $location) => {
      debug($route.current.params);

      $scope.error = false;
      $scope.error_message = '';

      var user = {
        id: $route.current.params.id,
        loaded: false
      };

      yAPI.apiCall('/users/' + user.id).then((ret) => {
        $scope.user = ret.data.users[0];
        $scope.user.loaded = true;
        $scope.ownprofile = false;

        if($scope.user.id == yAPI.session.user.id) {
          $scope.ownprofile = true;
        }


      }, () => {
        $scope.error = true;
        $scope.error_message = 'user not found';
      });

      $scope.sendMessage = () => {

        var chat = yChat.getExistingChat($scope.user.id,yAPI.session.chats);

        if(chat) {
          $location.path('/chat/' + chat.id);
        } else {
          $location.path('/chat/new/' + $scope.user.id );
        }

      };
    },
    link: ($scope, element, attr) => {
      $scope.userid = attr.userid;

    }
  }
}
