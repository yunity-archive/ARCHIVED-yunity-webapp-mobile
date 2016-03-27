import { module, inject } from './test-helper';

import app from '../src/yunity';

describe('yunity', () => {

  beforeEach(module(app));

  let $controller;

  beforeEach(inject(_$controller_ => {
    $controller = _$controller_;
  }));

  describe('yAPI', () => {

    let yAPI;
    beforeEach(inject(_yAPI_ => yAPI = _yAPI_));

    it('has a logged out session', () => {
      expect(yAPI.getSession().loggedin).toEqual(false);
    });

  })

  describe('ySocket', () => {

    let ySocket;
    beforeEach(inject(_ySocket_ => ySocket = _ySocket_));

    it('blah', () => {
      expect(ySocket.currentSessionId).toEqual(undefined);
    });

  });

  it('has a controller', () => {
    let ctrl = $controller('MainController');
    expect(ctrl.wooooo()).toEqual('yeeeeeeeeeeeeeeeeeeeeeeeeeeah');
  });

  it('works', () => {
    expect(5).toEqual(5);
  });

});