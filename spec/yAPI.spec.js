import { app, module, inject } from './test-helper';

describe('yAPI', () => {

  beforeEach(module(app));

  it('has a logged out session', inject(yAPI => {
    expect(yAPI.getSession().loggedin).toEqual(false);
  }));

});