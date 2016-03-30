const debug = require('debug')('yunity:components:createItemPage');

export default class CreateItemPageCtrl {
  constructor($scope, yAPI, $location) {
    'ngInject';
    Object.assign(this, {
      $scope, yAPI, $location,
      data: {
        description: '',
        longitude: 0.0,
        latitude: 0.0
      }
    });
  }

  createItem() {
    this.yAPI.apiCall({
      uri: '/items',
      method: 'POST',
      data: this.data
    }).then(() => {
      this.$location.path('/list/items');
    }, (err) => {
      debug('cannot create item', err);
    });
  }

}
