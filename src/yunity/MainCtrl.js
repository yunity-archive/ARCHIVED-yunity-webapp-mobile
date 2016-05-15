
const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {
  
  constructor($rootScope, $location, $mdSidenav, yAPI, yMapService) {
    'ngInject';
    Object.assign(this, {
      $rootScope, $location, $mdSidenav, yAPI, yMapService,
      
      session: {},
      profileItems: [],
      
      menuItems: [
        { title: 'Map'         , href: 'map'    , icon: 'map'         },
        { title: 'Communities' , href: 'groups' , icon: 'domain'      },
        { title: 'Stores'      , href: 'stores' , icon: 'store'       },
        { title: 'Events'      , href: 'events' , icon: 'event'       },
        { title: 'Bananas'     , href: 'items'  , icon: 'local_offer' },
        { title: 'Users'       , href: 'users'  , icon: 'people'      },
        { title: 'About'       , href: 'about'  , icon: 'help'        }
      ],
      
      categories: [
        { name: 'Booksharing'  , icon: 'book'  },
        { name: 'Carsharing'   , icon: 'car'   },
        { name: 'Couchsurfing' , icon: 'bed'   },
        { name: 'Foodsharing'  , icon: 'apple' }
      ],
      
      sidebarLeft: 'menu',
      activeCategory: null
    });
    
    $rootScope.$watch('session', (session) => {
      this.session = session || {};
      let { loggedIn, user } = this.session;
      if (loggedIn) {
        this.profileItems = [
          { title: 'Profile'  , href: `profile/${user.id}` , icon: 'account_circle' },
          { title: 'Settings' , href: 'settings'           , icon: 'settings'       },
          { title: 'Logout'   , href: 'logout'             , icon: 'exit_to_app'    }
        ];
      } else {
        this.profileItems = [
          { title: 'Login'  , href: 'login'  , icon: 'input'       },
          { title: 'Signup' , href: 'signup' , icon: 'account_box' }
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
