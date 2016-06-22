import { app, module, inject } from './helper';

describe('ySession', () => {

  beforeEach(module(app));

  it('has a logged out session', inject(ySession => {
    expect(ySession.getSession().loggedIn).toEqual(false);
  }));

});
