/*
 * INIT APP
 */
var app = angular.module('YunityMobile', [
  'ngRoute',
  'mobile-angular-ui',
  
  // drag features here
  'mobile-angular-ui.gestures'
]);

app.directive('yMap', function() {
	return {
		restrict: 'A',
		link: function($scope, $element, $attr) {
			
			//height = window.innerHeight;

			//$element.css('height',window.innerHeight+'px');
			yMap.init($element[0]);
			
		}
	};
});

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
  $routeProvider.when('/login',         {templateUrl: 'login.html', reloadOnSearch: false});
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
  
  /*
   * LOGIN STUFF
   */
  
  $scope.login = function() {
	  alert('You submitted the login form');
  };
  
  
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
	  
	  
	 $scope.test = 'Hallo Welt und so...';
	
});


