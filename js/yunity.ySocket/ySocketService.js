import socketIOClient from 'socket.io-client';

import { SESSION_COOKIE_NAME } from './settings';

const debug = require('debug')('yunity:socket');

export default class YSocket {

  constructor($q, $cookies) {
    'ngInject';
    Object.assign(this, {
      $q, $cookies,

      listeners: [],
      deferreds: [],
      currentSessionId: $cookies.get(SESSION_COOKIE_NAME),

      socket: socketIOClient('http://' + location.host, {
        path: '/socket'
        //transports: ['websocket']
      })

    });

    this.socket.on('connect', () => {
      if (this.currentSessionId) {
        debug('emitting session id', this.currentSessionId);
        this.socket.emit('authenticate', { sessionId: this.currentSessionId });
      }
      this.deferreds.forEach(deferred => {
        deferred.resolve();
      });
      this.deferreds.length = 0;
    });

    this.socket.on('message', data => {
      this.listeners.forEach(fn => fn(data));
    });

  }

  listen(fn) {
    this.listeners.push(fn);
    return () => { // unlisten fn
      let idx = this.listeners.indexOf(fn);
      if (idx) this.listeners.splice(idx, 1);
    };
  }

  setSessionId(sessionId) {
    if (sessionId !== this.currentSessionId) {
      this.currentSessionId = sessionId;
      if (this.socket.connected) {
        debug('emitting session id', this.currentSessionId);
        this.socket.emit('authenticate', { sessionId: this.currentSessionId });
      }
    }
  }

  clearSession() {
    debug('would clear session');
  }

  ensureConnected() {
    if (this.socket.connected) {
      return this.$q.resolve();
    } else {
      let deferred = this.$q.defer();
      this.deferreds.push(deferred);
      return deferred.promise;
    }
  }

}
