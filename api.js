const apiModule = angular.module('yunityAPI', []);

apiModule.provider('$yunityAPI', [function(){
  
  this.$get = $http => {

    return {
      
      authenticate(email, password) {
        console.log('woudl authenticated', email, password, 'using this', $http);
      }

    };

  };

  return this;

}]);

apiModule.run(() => {
  
});

export default 'yunityAPI';