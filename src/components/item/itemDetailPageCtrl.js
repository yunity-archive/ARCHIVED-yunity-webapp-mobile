const debug = require('debug')('yunity:itemDetailPage');

export default class ItemDetailPageCtrl {

  constructor(yAPI, $routeParams, $location, $rootScope) {
    'ngInject';
    Object.assign(this, {
      yAPI, $routeParams, $location, $rootScope,
      item: null,

      // TODO(ns) this is needed because directive has an isolate scope
      // not sure what is the best practise here....
      session: $rootScope.session

    });

    this.yAPI.apiCall('/items/' + $routeParams.id).then((ret) => {
      this.item = ret.data;
    });

  }

  requestItem() {
    //to do open chat with owner of item and isert default text
    debug('you got a Bannana');
    this.$location.path('/list/items');
  }
}
