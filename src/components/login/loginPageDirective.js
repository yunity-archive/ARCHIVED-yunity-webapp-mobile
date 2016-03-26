import loginTemplate from './loginPage.html';
import loginPageCtrl from './loginPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: loginTemplate,
    controller: loginPageCtrl,
    controllerAs: 'ctrl'
  };
}