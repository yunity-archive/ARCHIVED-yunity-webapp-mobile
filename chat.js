import angularWamp from 'angular-wamp';

const chatModule = angular.module('yunityChat', [angularWamp]);

chatModule.provider('$yunityChat', function () {

    this.$get = () => {

        return {

            sendMessage(message) {
                console.log('would send message :)');
            }

        };

    };

    return this;

});

chatModule.config(['$wampProvider', $wampProvider => {

    console.log('configuring wamp');

    $wampProvider.init({
        url: 'ws://' + location.host + '/ws',
        realm: 'realm1'
        //Any other AutobahnJS options
    });

}]);

chatModule.run(['$wamp', $wamp => {
    $wamp.open();
}]);

export default 'yunityChat';
