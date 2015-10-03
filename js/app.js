import yunityAPI from 'yunity-webapp-common/api';
import yunityChat from 'yunity-webapp-common/chat';
import yunityMap from 'yunity-webapp-common/map';
import yunityWall from '../components/wall/wall.js';


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
    yunityMap,
    yunityWall,
]);


/*
 * FORM VALIDATION DIRECTIVE
 */
app.directive('showErrors', function () {
    return {
        restrict: 'A',
        link: function (scope, el) {
            el.bind('blur', function () {

                var valid = false;

                el.toggleClass('has-error', valid);
            });
        }
    }

});

/*
 * INIT
 */
app.run(['$transform', '$rootScope', 'yAPI', function ($transform, $rootScope, yAPI) {

    /*
     * API Configuration
     */
    yAPI.config({
        url: '/testapi',
        urlSuffix: '.json',
        requestStart: function() { console.log('start'); },
        requestComplete: function() { console.log('complete'); },
    });

    window.$transform = $transform;
}]);

/*
 * ROUTUNG
 */
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        template: '<wall-page />',
        reloadOnSearch: false
    });
    $routeProvider.when('/login', {
        templateUrl: 'login.html',
        reloadOnSearch: false,
        controller: 'YunityLogin'
    });

    $routeProvider.when('/signup', {
        templateUrl: 'signup.html',
        reloadOnSearch: false
    });

    $routeProvider.when('/about', {templateUrl: 'about.html', reloadOnSearch: false});
    $routeProvider.when('/map', {
        templateUrl: 'map.html',
        reloadOnSearch: false,
        controller: 'YunityMap'
    });

});

/*
 * MAIN CONTROLLER
 */
app.controller('MainController', ['$rootScope', '$scope', 'yAPI', 'yMapService', function ($rootScope, $scope, yAPI, yMapService) {

    /*
     * handle categores
     */
    $scope.activeCategory = null;
    $scope.categories = [
        {
            name: 'Booksharing',
            icon:'book'
        },
        {
            name: 'Carsharing',
            icon: 'car'
        },
        {
            name: 'Couchsurfing',
            icon: 'bed'
        },
        {
            name: 'Foodsharing',
            icon: 'apple'
        }
    ];

    $scope.showSubCategories = function(cat) {
        $scope.activeCategory = cat;
    };

    $scope.sidebarLeft = 'menu';

    $scope.session = {
        loggedIn: true
    };

    /*
     * LOADING SPINNER
     */
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });

    $scope.login = function () {

        yAPI.authenticate({
            email: $scope.email,
            password: $scope.password,
            success: function(){
                $scope.session.loggedIn = true;
            },
            error: function() {
                $scope.session.loggedIn = true;
            }
        });

    };

    $scope.filter = function() {

        yAPI.listMappable({
            filter:{},
            success: function(ret){
                console.log('show items on status > ' + ret.data.items.length);

                if(ret.data.items != undefined && ret.data.items.length > 0) {
                    yMapService.renderMarkerCluster(ret.data.items);
                }
                else {
                    alert('no items found');
                }

            },
            error: function(ret) {
                console.log(ret);
            }
        });

    };



}]);

/*
 * LOGIN CONTROLLER
 */
app.controller('YunityLogin', ['$rootScope', '$scope', 'yAPI', function ($rootScope, $scope, yAPI) {




}]);

/*
 * CHAT CONTROLLER
 */
app.controller('YunityChat', ['$rootScope', '$scope', function ($rootScope, $scope) {

    /*
     *	Chat
     */
    $scope.chatUsers = [
        {name: 'Matthias', online: true},
        {name: 'Raphael', online: true},
        {name: 'Jamos', online: true},
        {name: 'Michael', online: true},
        {name: 'Lisa', online: false}
    ];

}]);

/*
 * MAP CONTROLLER
 */
app.controller('YunityMap', ['$rootScope', '$scope', 'yMapService', function ($rootScope, $scope, yMapService) {

   // yMapService.addMarker();

}]);


