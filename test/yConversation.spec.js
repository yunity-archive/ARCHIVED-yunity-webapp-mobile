import { app, module, inject } from './helper';

describe('yConversation', () => {

  beforeEach(module(app));

  it('has an initChats function', inject(yConversation => {
    expect(typeof yConversation.initChats).toEqual('function');
  }));

});