import angular from 'angular';

angular.module('yunity.mobile').directive('groups', function() {

  console.log('groups init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/groups.html',
    controller: function ($scope, yAPI) {

      $scope.groups = [];

      yAPI.apiCall({
        uri: '/groups',
        method: 'GET'
      }).then(function(res){

        $scope.groups = res.data.groups;

      });

    },
    link: function($scope, element, attr, yAPI){
      //console.log('link => ' + attr.userid);

      $scope.userid = attr.userid;

      /*
      yAPI.apiCall('/user/' + attr.userid).then(function(ret){
      console.log(ret.data);
    });
    */

  }
}
});

angular.module('yunity.mobile').directive('groupsAdd', function() {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/groups-add.html',
    controller: function ($scope, yAPI, $location) {

      $scope.addgroup = function() {

        if($scope.name != '') {
          yAPI.apiCall({
            uri: '/groups',
            method: 'POST',
            data: {
              description: $scope.description,
              name: $scope.name
            }
          }).then(function(res){

            $location.path('/groups');

          });
        }
        else
        {
          alert('enter a group name please');
        }

      };


    },
    link: function($scope, element, attr, yAPI){
      //console.log('link => ' + attr.userid);

      $scope.userid = attr.userid;

      /*
      yAPI.apiCall('/user/' + attr.userid).then(function(ret){
      console.log(ret.data);
    });
    */

  }
}
});

angular.module('yunity.mobile').directive('groupPage', function($route, $routeParams, yAPI) {

  console.log('profile init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/groups/group.html',
    controller: function ($scope, $rootScope, yAPI, yChat, $route, $location) {
      console.log($route.current.params);

      var group = {
        id: $route.current.params.id,
        loaded: false
      };

      yAPI.apiCall('/groups/' + group.id).then(function(ret){
        $scope.group = ret.data;
        $scope.group.loaded = true;

        console.log(ret);


      },function(ret){
        alert('group could not be loaded');
      });
    },
    link: function($scope, element, attr){

      let groupId = $routeParams.id;

      $scope.userid = attr.userid;

      $scope.joinGroup = () => {
        console.log('joining group');

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
      console.log(ret.data);
    });
    */

  }
}
});

export default 'YunityGroups';