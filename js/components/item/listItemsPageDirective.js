import listItemsTemplate from './listItemsPage.html';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listItemsTemplate,
    controller: ($scope, yAPI) => {
      'ngInject';
      yAPI.apiCall('/items').then((ret) => {

        $scope.items = ret.data.items.reverse();
      });
    }
  };
}