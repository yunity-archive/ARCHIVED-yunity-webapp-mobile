import angular from 'angular';

angular.module('yunity.mobile').directive('createItemPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/item/create-item.html',
    controller: ($scope, yAPI, $location) => {

      $scope.a = 'foo';
      $scope.createItem = () => {

        yAPI.apiCall({
          uri: '/items',
          method: 'POST',
          data: {
            description: $scope.description,
            longitude: 0.0,
            latitude: 0.0
          }
        }).then((res) => {

          $location.path('/list/items');

        },
        (ret) => {
          alert('cannot create item: ' + ret.data.reason);
        });

      };
    }
  };
});


angular.module('yunity.mobile').directive('listItemsPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/item/list-items.html',
    controller: ($scope, yAPI, $location) => {
      yAPI.apiCall('/items').then((ret) => {

        $scope.items = ret.data.items.reverse();
      });
    }
  };
});

angular.module('yunity.mobile').directive('itemDetailPage', () => {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/item/item.html',
    controller: ($scope, yAPI, $routeParams, $location, $rootScope) => {

      $scope.requestItem = () => {

        //to do open chat with owner of item and isert default text
        alert('you got a Bannana');
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
});



export default 'YunityItem';
