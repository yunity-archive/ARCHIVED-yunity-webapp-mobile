import groupPageTemplate from './groupPage.html';

const debug = require('debug')('yunity:component:group-page');

export default function($route, $routeParams, yAPI) {

  debug('group page init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupPageTemplate,
    controller: ($scope, $rootScope, yAPI, yChat, $route) => {
      debug($route.current.params);

      var group = {
        id: $route.current.params.id,
        loaded: false
      };

      yAPI.apiCall('/groups/' + group.id).then((ret) => {
        $scope.group = ret.data;
        $scope.group.loaded = true;

        debug(ret);


      }, () => {
        alert('group could not be loaded');
      });
    },
    link: ($scope, element, attr) => {

      let groupId = $routeParams.id;

      $scope.userid = attr.userid;

      $scope.joinGroup = () => {
        debug('joining group');

        yAPI.apiCall({
          uri: `/groups/${groupId}/members`,
          method: 'POST',
          data: {
            users: [yAPI.session.user.id]
          }
        }).then(() => {
          $route.reload();
        });
      };

      /*
      yAPI.apiCall('/user/' + attr.userid).then(function(ret){
      debug(ret.data);
    });
    */

  }
}
}
