
const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {

  constructor($rootScope, $location, $mdSidenav, yAPI, yMapService) {
    'ngInject';
    Object.assign(this, {
      $rootScope, $location, $mdSidenav, yAPI, yMapService,

      session: {},
      menuItems: [],
      profileItems: [],

      sidebarLeft: 'menu',
      activeCategory: null,
      categories: [{
        name: 'Booksharing',
        icon: 'book'
      }, {
        name: 'Carsharing',
        icon: 'car'
      }, {
        name: 'Couchsurfing',
        icon: 'bed'
      }, {
        name: 'Foodsharing',
        icon: 'apple'
      }]
    });

    $rootScope.$watch('session', (session) => {
      // TODO: Find out why session is undefined.
      this.session = session || {};
      if (session && session.loggedIn) {
        this.menuItems = [
          { href: 'chat', title: 'Chat' },
          { href: 'groups', title: 'Groups' },
          { href: 'items/new', title: 'Share a banana' },
          { href: 'items', title: 'List of bananas' },
          { href: 'users', title: 'List of users' }
        ];
        this.profileItems = [
          { icon: 'account_circle', href: `profile/${session.user.id}`, title: 'Profile' },
          { icon: 'settings', href: 'settings', title: 'Settings' },
          { icon: 'exit_to_app', href: 'logout', title: 'Logout' }
        ];
      } else {
        this.menuItems = [
          { href: 'groups', title: 'Groups' },
          { href: 'items', title: 'List of bananas' },
          { href: 'users', title: 'List of users' }
        ];
        this.profileItems = [
          { icon: 'input', href: 'login', title: 'Login' },
          { icon: 'account_box', href: 'signup', title: 'Signup' }
        ];
      }
    });
    
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  openSidenav() {
    this.$mdSidenav('left').open();
  }

  closeSidenav() {
    this.$mdSidenav('left').close();
  }

  go(path) {
    this.$location.path(path);
    this.closeSidenav();
  }

  showSubCategories(cat) {
    this.activeCategory = cat;
  }

  filter() {

    this.yAPI.listMappable({
      filter: {},
      success: (ret) => {
        debug('show items on status > ' + ret.data.items.length);
        if (ret.data.items !== undefined && ret.data.items.length > 0) {
          this.yMapService.renderMarkerCluster(ret.data.items);
        } else {
          debug('no items found');
        }
      }, error: (ret) => {
        debug(ret);
      }
    });
  }

}
