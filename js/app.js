//import './js/message.js';
import yunityAPI from '../common/api';
import yunityChat from '../common/chat';
import yunityMap from '../common/map';

/*
* INIT APP
*/
var app = angular.module('yunity.mobile', [
  'ngRoute',
  'mobile-angular-ui',
  // drag features here
  'mobile-angular-ui.gestures',
  yunityAPI,
  yunityChat,
  yunityMap
]);

/*
* FORM VALIDATION DIRECTIVE
*/
app.directive('showErrors', function() {
  return {
    restrict: 'A',
    link: function(scope, el) {
      el.bind('blur', function() {

        var valid = false;

        el.toggleClass('has-error', valid);
      });
    }
  };

});

/*
* INIT
*/
app.run(['$transform', '$rootScope', 'yAPI', '$location', '$route', function($transform, $rootScope, yAPI, $location, $route) {

  /*
  * API Configuration
  */
  yAPI.config({
    url: '/api',
    urlSuffix: '',
    requestStart: function() {
      $rootScope.loading = true;
      console.log('start');
    },
    requestComplete: function() {
      console.log('complete');
      $rootScope.loading = false;
    }
  });
  $rootScope.$on('$routeChangeStart', function(event, next) {
    console.log('routeChangeStart next is:', next);
    yAPI.checkLogin().then(function() {}, function() {

      if (next.access !== undefined) {
        if (next.access.requiresLogin) {
          if (!yAPI.session.loggedin) {
            console.log('access not allowed');
            event.preventDefault();
            $location.path('/login');
            $route.reload();
          }
        }
      }
    })
  });

  window.$transform = $transform;

}]);

/*
* ROUTUNG
*/
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    template: '<wall-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/signup', {
    template: '<signup-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/login', {
    template: '<login-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/groups', {
    template: '<groups />',
    reloadOnSearch: false
  });

  $routeProvider.when('/group/:id', {

    template: function(params) {
      return `<group-page groupid="${params.id}" />`;
    },
    reloadOnSearch: false
  });

  $routeProvider.when('/groups/add', {
    template: '<groups-add />',
    reloadOnSearch: false
  });

  $routeProvider.when('/profile/:id', {

    template: function(params) {
      return `<profile-page userid="${params.id}" />`;
    },
    reloadOnSearch: false
  });

  $routeProvider.when('/chat/:id', {
    templateUrl: 'chat.html',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

  $routeProvider.when('/chat/new/:userids', {
    template: function(params) {
      return `<chat-page userids="${params.userids}" />`;
    },
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });


  $routeProvider.when('/about', {
    templateUrl: 'about.html',
    reloadOnSearch: false
  });

  $routeProvider.when('/map', {
    template: '<map-page />',
    reloadOnSearch: false,
  });

  $routeProvider.when('/create/item', {
    template: '<create-item-page />',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

  $routeProvider.when('/list/items', {
    template: '<list-items-page />',
    reloadOnSearch: false,

  });

  $routeProvider.when('/item/:id', {
    template: '<item-detail-page />',
    reloadOnSearch: false,

  });

  $routeProvider.when('/list/users', {
    template: '<list-users-page />',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

});

// app.provider('authFilter', function() {
//         this.$get = function(yAPI, $location) {
//                 console.log('authFilter');
//                 if (!yAPI.session.loggedin) {
//                         $location.path('/login');
//                         return false;
//                 }
//                 return true;
//         };
// });

/*
* MAIN CONTROLLER
*/
app.controller('MainController', ['$rootScope', '$scope', 'yAPI', 'yMapService', 'ySocket', function($rootScope, $scope, yAPI, yMapService) {

  // $scope.session = yAPI.getSession;

  // console.log('session');
  // console.log($scope.session);

  /*
  * handle categores
  */
  $scope.activeCategory = null;
  $scope.categories = [{
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
  }];

  $scope.showSubCategories = function(cat) {
    $scope.activeCategory = cat;
  };

  $scope.sidebarLeft = 'menu';

  /*
  * LOADING SPINNER
  */
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });



  $scope.filter = function() {

    yAPI.listMappable({
      filter: {},
      success: function(ret) {
        console.log('show items on status > ' + ret.data.items.length);

        if (ret.data.items != undefined && ret.data.items.length > 0) {
          yMapService.renderMarkerCluster(ret.data.items);
        } else {
          alert('no items found');
        }

      },
      error: function(ret) {
        console.log(ret);
      }
    });
  };




}]);
