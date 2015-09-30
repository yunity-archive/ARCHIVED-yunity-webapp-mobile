const chatModule = angular.module('yunityChat', []);

chatModule.provider('$yunityChat', function(){
  
  this.$get = ($rootScope, $q, $log, $injector) => {

    return {
      
      createMessage(message) {
        console.log('would send message :)');
      }

    };

  };

  return this;

});
