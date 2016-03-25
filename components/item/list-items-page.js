export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: 'components/item/list-items.html',
    controller: ($scope, yAPI) => {
      yAPI.apiCall('/items').then((ret) => {

        $scope.items = ret.data.items.reverse();
      });
    }
  };
}