
const debug = require('debug')('yunity:MainCtrl');

export default class MainCtrl {

  constructor($rootScope, yAPI, yMapService) {
    'ngInject';
    Object.assign(this, {
      $rootScope, yAPI, yMapService,

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

    this.$rootScope.$on('$routeChangeStart', () => {
      this.$rootScope.loading = true;
    });

    this.$rootScope.$on('$routeChangeSuccess', () => {
      this.$rootScope.loading = false;
    });

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