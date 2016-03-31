import listUsersTemplate from './listUsersPage.html';
import listUsersPageCtrl from './listUsersPageCtrl';

/**
 *
 * @ngdoc directive
 * @name listUsersPage
 * @module profile
 * @template ./listUsersPage.html
 * @restrict E
 * @descrition
 * This is an awesome directive!
 *
**/
export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listUsersTemplate,
    controller: listUsersPageCtrl,
    controllerAs: 'ctrl'
  };
}