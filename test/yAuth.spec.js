const debug = require('debug')('yunity:yAuthSpec');
import { app, module, inject } from './helper';

describe('yAuth testsuite', () => {
  beforeEach(module(app));
  let $httpBackend;
  beforeEach(inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .when('GET', '/api/auth/status')
      .respond(200, {});
    $httpBackend
      .when('POST', '/api/auth/')
      .respond(200, {});
  }));
  afterEach(inject(($rootScope) => {
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingExpectation);
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingRequest);
  }));

  it('exists', inject(yAuth => {
    expect(yAuth).toBeDefined();
  }));

  it('gets logged out status', inject(yAuth => {
    let loggedOutResponse = {
      display_name: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    $httpBackend
      .expectGET('/api/auth/status/')
      .respond(200, loggedOutResponse);

    let response = [];
    yAuth.getStatus().then((ret) => {
       response = ret.data;
    });
    $httpBackend.flush();

    expect(response).toEqual(loggedOutResponse);
  }));

  it('does user authentication', inject((yAuth, ySession) => {
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
      .expectPOST('/api/auth/')
      .respond(200, user);

    yAuth.authenticate(credentials);
    $httpBackend.flush();

    expect(ySession.getSession().loggedIn).toBe(true);
    expect(ySession.getSession().user).toEqual(user);
  }));


});
