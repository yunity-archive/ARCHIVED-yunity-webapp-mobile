import { app, module, inject } from './helper';

import LoginPageCtrl from '../src/components/login/loginPageCtrl';

describe('LoginPageCtrl', () => {

  beforeEach(module(app));

  let $httpBackend;

  beforeEach(inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;

    $httpBackend
      .when('GET', '/api/auth/login')
      .respond(200, {
        user: {}
      });

    $httpBackend
      .when('GET', '/api/chats')
      .respond(200, {
        chats: []
      });

  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('can login', inject(($injector, yAPI) => {

    let ctrl = $injector.instantiate(LoginPageCtrl);

    expect(ctrl).toBeDefined();

    expect(yAPI.getSession().loggedIn).toEqual(false);

    let credentials = {
      email: 'foo@foo.com',
      password: 'foo'
    };

    let user = {
      id: 1,
      display_name: 'The Diplay Name',
      first_name: 'The First Name',
      last_name: 'The Last Name'
    };

    $httpBackend
      .expectPOST('/api/auth/login', credentials)
      .respond(200, { user });

    // filling in the form
    ctrl.data = credentials;

    ctrl.login();

    $httpBackend.flush();

    expect(yAPI.getSession().loggedIn).toEqual(true);
    expect(yAPI.getSession().user.display_name).toEqual(user.display_name);
    expect(yAPI.getSession().user.first_name).toEqual(user.first_name);
    expect(yAPI.getSession().user.last_name).toEqual(user.last_name);

  }));

});