const debug = require('debug')('yunity:yUserSpec');
import { app, module, inject } from './helper';

describe('yUser testsuite', () => {
  beforeEach(module(app));

  let $httpBackend;

  debug('beforeEach');

  beforeEach(inject(_$httpBackend_ => {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .when('GET', '/api/users/')
      .respond(200, []);
  }));

  debug('afterEach');

  afterEach(inject(($rootScope) => {
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingExpectation);
    $rootScope.$evalAsync($httpBackend.verifyNoOutstandingRequest);
  }));

  debug('first test');

  it('exists', inject(yUser => {
    expect(yUser).toBeDefined();
  }));

  it('gets user list', inject(yUser => {
    let userlist = [{
      id: 1,
      display_name: 'Mr T',
      first_name: 'tilmann',
      last_name: 'becker',
      email: 'til@man.com'
    }];

    $httpBackend
      .expectGET('/api/users/')
      .respond(200, userlist);

    let yuserlist = [];
    yUser.getUserList().then((ret) => {
      yuserlist = ret.data;
    });
    $httpBackend.flush();

    expect(yuserlist).toEqual(userlist);
  }));


});
