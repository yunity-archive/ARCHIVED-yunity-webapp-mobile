export default class GroupsCtrl {

  constructor(yAPI, $location) {
    'ngInject';
    Object.assign(this, { yAPI, $location });
    this.groups = [];

    this.yAPI.apiCall({
      uri: '/groups',
      method: 'GET'
    }).then((res) => {
      this.groups = res.data.groups;
    });
  }

  show(groupId) {
    this.$location.path(`/groups/${groupId}`);
  }

}