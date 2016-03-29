import profileTemplate from './profilePage.html';
import profilePageCtrl from './profilePageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: profileTemplate,
    controller: profilePageCtrl,
    controllerAs: 'ctrl'
  };
}
