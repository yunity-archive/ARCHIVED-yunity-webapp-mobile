const debug = require('debug')('yunity:component:GroupsAddCtrl');

export default class GroupsAddCtrl{

  constructor($scope, yAPI, $location) {
    'ngInject';
    Object.assign(this, { $scope, yAPI, $location });
    this.data = {};
  }

  addgroup() {

    debug('adding group', this.data);

    if (this.data.name !== '') {
      this.yAPI.apiCall({
        uri: '/groups',
        method: 'POST',
        data: this.data
      }).then((res) => {
        this.$location.path(`/groups/${res.data.id}`);
      }).catch((err) => {
        debug('error', err);
      });
    } else {
      debug('enter a group name please');
    }

  }

}