import socketIOClient from 'socket.io-client';
import ngCookies from 'angular-cookies';

const SESSION_COOKIE_NAME = 'sessionid';

const socketModule = angular.module('yunitySocket', [
    ngCookies
]);

socketModule.factory('ySocket', ['$q', '$cookies', ($q, $cookies) => {

    let listeners = [];

    let sessionId = $cookies.get(SESSION_COOKIE_NAME);

    if (!sessionId) {
        sessionId = 'mypretendsessionid';
    }

    const socket = socketIOClient('http://' + location.host, {
        transports: ['websocket']
    });

    let deferreds = [];

    socket.on('connect', () => {
        socket.emit('authenticate', { sessionId: sessionId });
        deferreds.forEach(deferred => {
            deferred.resolve();
        });
        deferreds.length = 0;
    });

    socket.on('message', data => {
        listeners.forEach(fn => fn(data));
    });

    return {

        listen(fn) {

            listeners.push(fn);

            return () => { // unlisten fn
                let idx = listeners.indexOf(fn);
                if (idx) listeners.splice(idx, 1);
            };

        },

        ensureConnected() {
            if (socket.connected) {
                return $q.resolve();
            } else {
                let deferred = $q.defer();
                deferreds.push(deferred);
                return deferred.promise;
            }
        }

    };

}]);

export default socketModule.name;