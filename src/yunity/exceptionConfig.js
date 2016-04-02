const debug = require('debug')('yunity:exceptionHandler');

export default function exceptionConfig($provide) {
  'ngInject';
  $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

function extendExceptionHandler($delegate, $injector) {
  'ngInject';
  return function(exception, cause) {
    $delegate(exception, cause);
    try {
      let $mdToast = $injector.get('$mdToast', 'exceptionConfig');
      $mdToast.show($mdToast.simple().textContent(exception.message));
    } catch (e) {
      debug('exception before $mdToast was available', exception, cause);
    }
  };
}