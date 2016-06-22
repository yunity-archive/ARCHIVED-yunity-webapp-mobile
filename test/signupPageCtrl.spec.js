const debug = require('debug')('yunity:signupPageCtrlSpec');
import { app, module, inject } from './helper';

import SignupPageCtrl from '../src/pages/signup/signupPageCtrl';

xdescribe('SignupPageCtrl', () => {
  beforeEach(module(app));
  let $httpBackend;
  beforeEach(inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .when('POST', '/api/users/')
      .respond(200, {});
    $httpBackend
      .when('POST', '/api/auth')
      .respond(200, {})
    $httpBackend
      .when('GET', '/api/auth/status')
      .respond(200, {})
  }));

  afterEach(inject(($rootScope) => {
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingExpectation);
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingRequest);
  }));

  it('creates user', inject(($injector, ySession) => {
    let ctrl = $injector.instantiate(SignupPageCtrl);
    expect(ctrl).toBeDefined();
    expect(ySession.getSession().loggedIn).toEqual(false);

    let loggedOutResponse = {
      display_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    let user = {
      display_name: 'tilma',
      first_name: 'fn',
      last_name: 'ln',
      email: 'maiasnea@mail.de',
      password: 'mypw'
    };

    let userdata = {
      id: '1',
      display_name: 'tilma',
      first_name: 'fn',
      last_name: 'ln',
      email: 'maiasnea@mail.de'
    }

    let credentials = {
      email: 'maiasnea@mail.de',
      password: 'mypw'
    }

    $httpBackend
      .expectGET('/api/auth/status/')
      .respond(200, loggedOutResponse);

    $httpBackend
      .expectPOST('/api/users/', user)
      .respond(200, userdata);

    $httpBackend
      .expectPOST('/api/auth/', credentials)
      .respond(200, userdata);

    ctrl.data = user;
    ctrl.signup();

    $httpBackend.flush();

    expect(ySession.getSession().loggedIn).toBe(true);
    expect(ySession.getSession().user).toEqual(user);
  }
));

});
