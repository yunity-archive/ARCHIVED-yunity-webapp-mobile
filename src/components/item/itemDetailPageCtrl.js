const debug = require('debug')('yunity:itemDetailPage');

export default class ItemDetailPageCtrl {

  constructor(yAPI, $routeParams, $location, $rootScope) {
    'ngInject';
    Object.assign(this, {
      yAPI, $routeParams, $location, $rootScope,
      item: null
    });

    $rootScope.$watch('session', (session) => this.session = session);

    this.yAPI.apiCall('/items/' + $routeParams.id).then((ret) => {
      this.item = ret.data;
    });

  }

  isAvailable() {
    if (this.item &&
        this.session &&
        this.session.user &&
        this.session.user.id !== this.item.user_id) {
      return true;
    } else {
      return false;
    }
  }

  requestItem() {
    //to do open chat with owner of item and isert default text
    debug('you got a Bannana');
    this.$location.path('/list/items');
  }
}
