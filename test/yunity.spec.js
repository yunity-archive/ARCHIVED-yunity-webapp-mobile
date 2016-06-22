import { app, module, inject } from './helper';

describe('yunity', () => {

  beforeEach(module(app));

  describe('MainCtrl', () => {

    it('has a controller', inject($controller => {
      let ctrl = $controller('MainCtrl');
      expect(ctrl).toBeDefined();
    }));

  });

});
