const debug = require('debug')('yunity:loginPageCtrlSpec');
import { app, module, inject } from './helper';

import LoginPageCtrl from '../src/pages/login/loginPageCtrl';

xdescribe('LoginPageCtrl', () => {

  beforeEach(module(app));

  let $httpBackend;

  beforeEach(inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;

    $httpBackend
      .when('GET', '/api/auth/status/')
      .respond(200, {
        user: {}
      });

    $httpBackend
      .when('GET', '/api/chats/')
      .respond(200, {
        chats: []
      });

  }));

  afterEach(inject(($rootScope) => {
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingExpectation);
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingRequest);
  }));

  it('can login', inject(($injector, yAPI, ySession) => {
    let ctrl = $injector.instantiate(LoginPageCtrl);

    expect(ctrl).toBeDefined();

    expect(ySession.getSession().loggedIn).toEqual(false);

    let credentials = {
      email: 'foo@foo.com',
      password: 'foo'
    };

    let user = {
      id: 1,
      display_name: 'The Display Name',
      first_name: 'The First Name',
      last_name: 'The Last Name'
    };

    $httpBackend
      .expectPOST('/api/auth/', credentials)
      .respond(200, user);

    ctrl.data = credentials;

    ctrl.login();

    $httpBackend.flush();

    expect(ySession.getSession().loggedIn).toBe(true);
    expect(ySession.getSession().user).toEqual(user);
  }));

});
