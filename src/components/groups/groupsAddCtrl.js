export default class GroupsAddCtrl{

  constructor($scope, yAPI, $location) {
    'ngInject';
    Object.assign(this, { $scope, yAPI, $location });
    this.data = {};
  }

  addgroup() {

    if (this.data.name != '') {
      this.yAPI.apiCall({
        uri: '/groups',
        method: 'POST',
        data: this.data
      }).then(() => {
        this.$location.path('/groups');
      });
    } else {
      alert('enter a group name please');
    }

  }

}