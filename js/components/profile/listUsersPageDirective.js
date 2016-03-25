import listUsersTemplate from './listUsersPage.html';

const debug = require('debug')('yunity:list-users-page');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listUsersTemplate,
    controller: ($scope, yAPI) => {
      'ngInject';
      yAPI.apiCall('/users/').then((ret) => {
        debug(ret.data.users);
        $scope.users = ret.data.users;
      });

    }
  };
}