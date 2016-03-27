import angular from 'angular';
import 'angular-mocks'; // adds angular.mock

import app from '../src/yunity';

const { module, inject } = angular.mock;

/* re-export the useful things */
export { app, module, inject };

/*
  The debug() logger runs in the browser and thinks
  there is colour support, but karma ships it back
  here where there is no colour support.

  This overrides the logger globally for debug() so that
  it doesn't try and output colour.
*/
if (false) {
  require('debug').log = msg => {
    msg = msg.replace(/%c/g, '');
    /*eslint-disable */
    console.log(msg);
    /*eslint-enable */
  };
}