let debug = require('debug')('yunity:profile:list-users-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/profile/list-users.html',
    controller: ($scope, yAPI) => {
      yAPI.apiCall('/users/').then((ret) => {
        debug(ret.data.users);
        $scope.users = ret.data.users;
      });

    }
  };
}