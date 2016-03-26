/* global describe, it, expect, beforeEach */

import yunity from '../src/yunity';

console.log('imported yunity', yunity, window.module, 'is', window.module);

let { module, inject } = window;

describe('MainController', () => {
  beforeEach(module('yunity'));

  let MainController;

  beforeEach(inject(function(_MainController_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    console.log('got MainController', MainController);
    MainController = _MainController_;
  }));

  it('works', () => {
    expect(5).toEqual(5);
  });
});