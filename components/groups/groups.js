import angular from 'angular';

let debug = require('debug')('yunity:component:groups');

export default function() {

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
    link: ($scope, element, attr) => {
      $scope.userid = attr.userid;
    }
  }
}

//export default 'YunityGroups';