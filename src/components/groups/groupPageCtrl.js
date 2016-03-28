const debug = require('debug')('yunity:component:groupPageCtrl');

export default class GroupPageCtrl {

  constructor($rootScope, yAPI, yChat, $route, $routeParams) {
    'ngInject';
    Object.assign(this, { $rootScope, yAPI, yChat, $route, $routeParams });

    debug($route.current.params);

    var group = {
      id: $route.current.params.id,
      loaded: false
    };

    yAPI.apiCall('/groups/' + group.id).then((ret) => {
      this.group = ret.data;
      this.group.loaded = true;
      debug(ret);
    }, err => {
      debug('group could not be loaded', err);
    });
  }

  joinGroup() {
    let groupId = this.$routeParams.id;

    debug('joining group');

    this.yAPI.apiCall({
      uri: `/groups/${groupId}/members`,
      method: 'POST',
      data: {
        users: [this.yAPI.session.user.id]
      }
    }).then(() => {
      this.$route.reload();
    });

  }

}