import angular from 'angular';

let debug = require('debug')('yunity:component:profile');

angular.module('yunity.mobile').directive('profilePage', () => {

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


      }, (ret) => {
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
    link: ($scope, element, attr, yAPI) => {
      //debug('link => ' + attr.userid);

      $scope.userid = attr.userid;

      /*
      yAPI.apiCall('/user/' + attr.userid).then(function(ret){
      debug(ret.data);
    });
    */

  }
}
});

angular.module('yunity.mobile').directive('listUsersPage', () => {


  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/profile/list-users.html',
    controller: ($scope, $rootScope, yAPI, yChat, $route, $location) => {
      yAPI.apiCall('/users/').then((ret) => {
        debug(ret.data.users);
        $scope.users = ret.data.users;
      });

    }
  };
});

export default 'YunityProfile';
