import { app, module, inject } from './helper';

describe('yunity', () => {

  beforeEach(module(app));

  describe('MainController', () => {

    it('has a controller', inject($controller => {
      let ctrl = $controller('MainController');
      expect(ctrl).toBeDefined();
    }));

  });

});