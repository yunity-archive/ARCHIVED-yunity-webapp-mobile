const debug = require('debug')('yunity:component:groupPageCtrl');

export default class GroupPageCtrl {

  constructor($rootScope, yAPI, $stateParams) {
    'ngInject';
    Object.assign(this, {
      $rootScope, yAPI, $stateParams,
      group: {
        id: $stateParams.id,
        loaded: false
      }
    });

    debug($stateParams);

    yAPI.apiCall('/groups/' + this.group.id).then((ret) => {
      this.group = ret.data;
      this.group.loaded = true;
      debug(ret);
    }, (err) => {
      debug('group could not be loaded', err);
    });
  }

  joinGroup() {
    let groupId = this.$stateParams.id;

    debug('joining group');

    this.yAPI.apiCall({
      uri: `/groups/${groupId}/members`,
      method: 'POST',
      data: {
        users: [this.yAPI.session.user.id]
      }
    }).then(() => {
      this.$state.reload();
    });

  }

}