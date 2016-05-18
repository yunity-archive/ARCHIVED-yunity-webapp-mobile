export default class LoggedInCtrl {

  constructor($rootScope, yAPI) {
    'ngInject';
    Object.assign(this, { $rootScope, yAPI });
  }

  watch(fn) {
    this.yAPI.resolve().then(() => {
      this.$rootScope.$watch('session.loggedIn', fn);
    });
  }

}
