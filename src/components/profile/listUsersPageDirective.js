import listUsersTemplate from './listUsersPage.html';
import listUsersPageCtrl from './listUsersPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listUsersTemplate,
    controller: listUsersPageCtrl,
    controllerAs: 'ctrl'
  };
}