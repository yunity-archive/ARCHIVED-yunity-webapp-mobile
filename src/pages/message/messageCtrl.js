export default class MessageCtrl {

  constructor($scope, $attrs, ySession) {
    'ngInject';
    Object.assign(this, { $scope, ySession });

    Object.assign($scope, {
      user: this.ySession.getSession().user,
      create: ('create' in $attrs)
    });
  }

}
