
const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {
  
  constructor($rootScope, $location, $mdSidenav, yAPI, yMapService) {
    'ngInject';
    Object.assign(this, {
      $rootScope, $location, $mdSidenav, yAPI, yMapService,
      
      session: {},
      profileItems: [],
      
      menuItems: [
        { icon: 'map', href: 'map', title: 'Map' },
        { icon: 'domain', href: 'groups', title: 'Communities' },
        { icon: 'store', href: 'stores', title: 'Stores' },
        { icon: 'event', href: 'events', title: 'Events' },
        { icon: 'local_offer', href: 'items', title: 'Bananas' },
        { icon: 'people', href: 'users', title: 'Users' },
        { icon: 'help', href: 'about', title: 'About' }
      ],
      
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
      this.session = session || {};
      let { loggedIn, user } = this.session;
      if (loggedIn) {
        this.profileItems = [
          { icon: 'account_circle', href: `profile/${user.id}`, title: 'Profile' },
          { icon: 'settings', href: 'settings', title: 'Settings' },
          { icon: 'exit_to_app', href: 'logout', title: 'Logout' }
        ];
      } else {
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
