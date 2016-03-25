import listUsersTemplate from './list-users.html';

let debug = require('debug')('yunity:profile:list-users-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listUsersTemplate,
    controller: ($scope, yAPI) => {
      yAPI.apiCall('/users/').then((ret) => {
        debug(ret.data.users);
        $scope.users = ret.data.users;
      });

    }
  };
}