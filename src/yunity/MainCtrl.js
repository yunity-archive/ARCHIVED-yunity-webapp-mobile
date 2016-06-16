export default class MainCtrl {

  constructor($rootScope, $location, yAPI) {
    'ngInject';
    Object.assign(this, {
      $rootScope, $location, yAPI,

      session: {},
      profileItems: []
    });

    $rootScope.$watch('session', (session) => {
      this.session = session || {};
      let { loggedIn } = this.session;
      if (loggedIn) {
        this.profileItems = [
          { title: 'Profile'  , href: '/profile'  , icon: 'account_circle' },
          { title: 'Logout'   , href: '/logout'   , icon: 'exit_to_app'    }
        ];
      } else {
        this.profileItems = [
          { title: 'Login'  , href: '/login'  , icon: 'input'       },
          { title: 'Signup' , href: '/signup' , icon: 'account_box' }
        ];
      }
    });

  }

}
