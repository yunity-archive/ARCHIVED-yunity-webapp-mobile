import angular from 'angular';

export default function(yChat, yAPI, $route, $routeParams, $timeout) {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/chat/chat.html',
    link: ($scope, el, attrs) => {

      let containerEl = document.getElementById('chat-container'); // FIXME(ns) this should not be find-by-id...
      let scrollable = angular.element(containerEl).controller('scrollableContent');

      let userId = $routeParams.id;

      $scope.messages = [];

      yChat.getChatForUser(userId).then(chat => {
        $scope.chat = chat;
        yChat.listen($scope.chat.id, msgs => {
          $timeout(() => {
            msgs.forEach(msg => {
              $scope.messages.push(msg);
            });
            $timeout(() => {
              scrollable.scrollTo(containerEl.scrollHeight);
            });
          });
        });
      });

      $scope.sendMessage = () => {
        if ($scope.content) {
          let msg = { content: $scope.content };
          $scope.content = '';
          yChat.sendMessage($scope.chat.id, msg);
        }
      };

      /**
      * TO DO: returning correct path to avatar image
      */
      $scope.avatar = (user_id) => {
        return '/img/avatar.png';
      };

      /**
      * TO DO: returns user object and handle users to store them in memory
      *
      * @param id
      */
      $scope.getUser = (id) => {
        return {
          id: 12,
          name: 'Uwe'
        };
      };

    }
  }
}