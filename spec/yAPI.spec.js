import { app, module, inject } from './helper';

describe('yAPI', () => {

  beforeEach(module(app));

  it('has a logged out session', inject(yAPI => {
    expect(yAPI.getSession().loggedIn).toEqual(false);
  }));

});