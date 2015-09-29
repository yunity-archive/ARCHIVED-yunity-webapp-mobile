/*
 * INIT APP
 */
var app = angular.module('YunityMobile', [
  'ngRoute',
  'mobile-angular-ui',
  
  // drag features here
  'mobile-angular-ui.gestures'
]);

/*
 * INIT
 */
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
  
  /*
   * LOADING SPINNER
   */
  $rootScope.$on('$routeChangeStart', function(){
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(){
    $rootScope.loading = false;
  });
  
  
});

/*
 * CHAT CONTROLLER
 */
app.controller('YunityChat', function($rootScope, $scope){
	
	 /*
	  *	Chat
	  */
	  $scope.chatUsers = [
	    { name: 'Matthias', online: true },
	    { name: 'Raphael', online: true },
	    { name: 'Jamos', online: true },
	    { name: 'Michael', online: true },
	    { name: 'Lisa', online: false }
	  ];
	
});

/*
 * MAP CONTROLLER
 */
app.controller('YunityMap', function($rootScope, $scope){
	
	 /*
	  * initialize map one time
	  */
	 yMap.init();
	  
	  
	 $scope.test = 'Hallo Welt und so...';
	
});