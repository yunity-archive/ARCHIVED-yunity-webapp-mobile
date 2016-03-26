export default class GroupsCtrl {

  constructor($scope, yAPI) {
    'ngInject';
    Object.assign(this, { $scope, yAPI });
    this.groups = [];

    this.yAPI.apiCall({
      uri: '/groups',
      method: 'GET'
    }).then((res) => {
      this.groups = res.data.groups;
    });
  }

}