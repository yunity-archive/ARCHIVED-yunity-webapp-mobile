import angular from 'angular';
import socketIOClient from 'socket.io-client';

import ngCookies from 'angular-cookies';

const debug = require('debug')('yunity:socket');

const SESSION_COOKIE_NAME = 'sessionid';

const socketModule = angular.module('yunitySocket', [
  ngCookies
]);

socketModule.factory('ySocketHttpInterceptor', ['$cookies', 'ySocket', ($cookies, ySocket) => {

  return {
    response: response => {
      ySocket.setSessionId($cookies.get(SESSION_COOKIE_NAME));
      return response;
    }
  };

}]);

socketModule.config(['$httpProvider', ($httpProvider) => {
  $httpProvider.interceptors.push('ySocketHttpInterceptor');
}]);

socketModule.factory('ySocket', ['$q', '$cookies', ($q, $cookies) => {

  let listeners = [];

  let currentSessionId = $cookies.get(SESSION_COOKIE_NAME);

  const socket = socketIOClient('http://' + location.host, {
    path: '/socket'
    //transports: ['websocket']
  });

  let deferreds = [];

  socket.on('connect', () => {
    if (currentSessionId) {
      debug('emitting session id', currentSessionId);
      socket.emit('authenticate', { sessionId: currentSessionId });
    }
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

    setSessionId(sessionId) {
      if (sessionId !== currentSessionId) {
        currentSessionId = sessionId;
        if (socket.connected) {
          debug('emitting session id', currentSessionId);
          socket.emit('authenticate', { sessionId: currentSessionId });
        }
      }
    },

    clearSession() {
      debug('would clear session');
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