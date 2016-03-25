import itemDetailPageTemplate from './itemDetailPage.html';

const debug = require('debug')('yunity:itemDetailPage');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: itemDetailPageTemplate,
    controller: ($scope, yAPI, $routeParams, $location, $rootScope) => {
      'ngInject';

      $scope.requestItem = () => {

        //to do open chat with owner of item and isert default text
        debug('you got a Bannana');
        $location.path('/list/items');

      };

      // TODO(ns) this is needed because directive has an isolate scope
      // not sure what is the best practise here....
      $scope.session = $rootScope.session;

      yAPI.apiCall('/items/' + $routeParams.id).then((ret) => {

        $scope.item = ret.data;
      });
    }
  };
}
