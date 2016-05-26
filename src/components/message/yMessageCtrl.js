export default class YMessageCtrl {
  
  constructor($scope, $attrs, yAPI) {
    'ngInject';
    Object.assign(this, { $scope, yAPI });
    
    Object.assign($scope, {
      user: yAPI.session.user,
      create: ("create" in $attrs)
    });
  }
  
}
