import { app, module, inject } from './test-helper';

describe('yChat', () => {

  beforeEach(module(app));

  it('has an initChats function', inject(yChat => {
    expect(typeof yChat.initChats).toEqual('function');
  }));

});