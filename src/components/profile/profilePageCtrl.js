const debug = require('debug')('yunity:profilePage');

export default class ProfilePageCtrl {
  
  constructor($scope, $attrs, yAPI, $stateParams, $location) {
    'ngInject';
    Object.assign(this, {
      $scope, $location,
      yAPI,
      
      error: null
    });
    
    const own = ("own" in $attrs);
    const userID = (own ? yAPI.session.user.id : $stateParams.id);
    
    Object.assign($scope, {
      user: { id: userID, loaded: false },
      ownProfile: (userID == yAPI.session.user.id)
    })
    
    yAPI.apiCall('/users/' + userID)
      .then((ret) => {
        $scope.user = ret.data.users[0];
        $scope.user.loaded = true;
      })
      .catch((error) => {
        this.error = 'User not found';
      });
    
  }
  
}
