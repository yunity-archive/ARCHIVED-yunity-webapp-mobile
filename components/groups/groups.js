import groupsTemplate from './groups.html';

const debug = require('debug')('yunity:component:groups');

export default function() {

  debug('groups init');

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupsTemplate,
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