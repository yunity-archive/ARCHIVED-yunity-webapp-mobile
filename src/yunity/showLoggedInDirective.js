import LoggedInCtrl from './LoggedInCtrl';

export default function showLoggedIn() {
  return {
    scope: {},
    restrict: 'A',
    controller: LoggedInCtrl,
    controllerAs: 'ctrl',
    link
  };
}

function link(scope, element, attrs, ctrl) {
  element.addClass('ng-hide');
  ctrl.watch((isLoggedIn) => {
    if (isLoggedIn) {
      element.removeClass('ng-hide');
    } else {
      element.addClass('ng-hide');
    }
  });
}