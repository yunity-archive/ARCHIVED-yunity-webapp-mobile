export default class PostCtrl {
  
  constructor(yAPI) {
    'ngInject';
    Object.assign(this, {
      yAPI,
      user: yAPI.session.user
    });
  }
  
}
