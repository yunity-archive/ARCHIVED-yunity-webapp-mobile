import createItemTemplate from './create-item.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: createItemTemplate,
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
        }).then(() => {
          $location.path('/list/items');
        },
        (ret) => {
          alert('cannot create item: ' + ret.data.reason);
        });

      };
    }
  };
}
