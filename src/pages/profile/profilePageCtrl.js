export default class ProfilePageCtrl {

  constructor($scope, $attrs, yUser, ySession, $stateParams) {
    'ngInject';
    Object.assign(this, {
      $scope,
      yUser, ySession,

      error: null
    });

    const own = ('own' in $attrs);
    const userID = (own ? this.ySession.getSession().user.id : $stateParams.id);

    Object.assign($scope, {
      user: { id: userID, loaded: false },
      ownProfile: (userID === this.ySession.getSession().user.id)
    });

    this.$scope.user = this.yUser.getProfilePage(userID)
      .then((ret) => {
        return ret.data;
      })
      .catch(() => {
        this.error = 'User not found';
      });

  }

}
