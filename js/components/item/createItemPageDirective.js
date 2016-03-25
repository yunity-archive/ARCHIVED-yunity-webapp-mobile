import createItemPageTemplate from './createItemPage.html';

const debug = require('debug')('yunity:components:createItemPage');

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: createItemPageTemplate,
    controller: ($scope, yAPI, $location) => {
      'ngInject';

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
        err => {
          debug('cannot create item', err);
        });

      };
    }
  };
}
