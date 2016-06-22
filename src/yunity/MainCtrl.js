const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {

  constructor($rootScope, ySession, yAPI) {
    'ngInject';
    Object.assign(this, {
      $rootScope, ySession, yAPI,

      profileItems: [
        { title: 'Profile'  , href: '/profile'  , icon: 'account_circle' },
        { title: 'Logout'   , href: '/logout'   , icon: 'exit_to_app'    }
      ]
    });

    $rootScope.$watch('', (session) => {
      debug('listener fired', session);
      session = session || {};
      let { loggedIn } = session;
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
