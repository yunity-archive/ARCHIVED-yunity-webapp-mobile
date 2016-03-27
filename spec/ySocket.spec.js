import { app, module, inject } from './test-helper';

describe('ySocket', () => {

  beforeEach(module(app));

  it('blah', inject(ySocket => {
    expect(ySocket.currentSessionId).toBeUndefined();
  }));

});