import LoggedInCtrl from './LoggedInCtrl';

export default function hideLoggedIn() {
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
      element.addClass('ng-hide');
    } else {
      element.removeClass('ng-hide');
    }
  });
}