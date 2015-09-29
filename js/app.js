/*
 * INIT APP
 */
var app = angular.module('YunityMobile', [
  'ngRoute',
  'mobile-angular-ui',
  
  // drag features here
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

/*
 * ROUTUNG
 */ 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/about',         {templateUrl: 'about.html', reloadOnSearch: false}); 
  $routeProvider.when('/map',        	{templateUrl: 'map.html', reloadOnSearch: false}); 
});

/*
 * MAIN CONTROLLER
 */
app.controller('MainController', function($rootScope, $scope){


  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  
  /*
   * LOADING SPINNER
   */
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
  /*
   	Chat
  */
  
  $scope.chatUsers = [
    { name: 'Matthias', online: true },
    { name: 'Raphael', online: true },
    { name: 'Jamos', online: true },
    { name: 'Michael', online: true }
  ];
});