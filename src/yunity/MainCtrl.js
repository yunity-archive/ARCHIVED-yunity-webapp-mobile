
const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {

  constructor($rootScope, $location, $mdSidenav, yAPI, yMapService) {
    'ngInject';
    Object.assign(this, {
      $rootScope, $location, $mdSidenav, yAPI, yMapService,

      menuItems: [],

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

    $rootScope.$watch('session', session => {
      if (session && session.loggedin) {
        this.menuItems = [
          { href: 'chat/1', title: 'Chat' },
          { href: 'groups', title: 'Groups' },
          { href: 'create/item', title: 'Share a banana' },
          { href: 'list/items', title: 'List of bananas' },
          { href: 'list/users', title: 'List of users' },
          { href: `profile/${session.user.id}`, title: 'Profile' }
        ];
      } else {
        this.menuItems = [
          { href: 'login', title: 'Login' },
          { href: 'signup', title: 'Signup' }
        ];
      }
    });

    this.$rootScope.$on('$routeChangeStart', () => {
      this.$rootScope.loading = true;
    });

    this.$rootScope.$on('$routeChangeSuccess', () => {
      this.$rootScope.loading = false;
    });

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
        if (ret.data.items != undefined && ret.data.items.length > 0) {
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