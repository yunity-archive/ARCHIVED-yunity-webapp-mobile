import angular from 'angular';

let debug = require('debug')('yunity:component:groups');

angular.module('yunity.mobile').directive('groups', () => {

  debug('groups init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/groups.html',
    controller: ($scope, yAPI) => {

      $scope.groups = [];

      yAPI.apiCall({
        uri: '/groups',
        method: 'GET'
      }).then((res) => {

        $scope.groups = res.data.groups;

      });

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

angular.module('yunity.mobile').directive('groupsAdd', () => {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/groups-add.html',
    controller: ($scope, yAPI, $location) => {

      $scope.addgroup = () => {

        if($scope.name != '') {
          yAPI.apiCall({
            uri: '/groups',
            method: 'POST',
            data: {
              description: $scope.description,
              name: $scope.name
            }
          }).then((res) => {

            $location.path('/groups');

          });
        }
        else
        {
          alert('enter a group name please');
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

angular.module('yunity.mobile').directive('groupPage', ($route, $routeParams, yAPI) => {

  debug('profile init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/group.html',
    controller: ($scope, $rootScope, yAPI, yChat, $route, $location) => {
      debug($route.current.params);

      var group = {
        id: $route.current.params.id,
        loaded: false
      };

      yAPI.apiCall('/groups/' + group.id).then((ret) => {
        $scope.group = ret.data;
        $scope.group.loaded = true;

        debug(ret);


      }, (ret) => {
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
});

export default 'YunityGroups';