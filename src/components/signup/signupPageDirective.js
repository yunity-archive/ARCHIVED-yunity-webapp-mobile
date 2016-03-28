import signupTemplate from './signupPage.html';

import signupPageCtrl from './signupPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: signupTemplate,
    controller: signupPageCtrl,
    controllerAs: 'ctrl'
  };
}