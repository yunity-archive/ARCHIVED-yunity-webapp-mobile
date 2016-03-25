import listItemsTemplate from './list-items.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listItemsTemplate,
    controller: ($scope, yAPI) => {
      yAPI.apiCall('/items').then((ret) => {

        $scope.items = ret.data.items.reverse();
      });
    }
  };
}