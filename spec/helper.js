import angular from 'angular';
import 'angular-mocks'; // adds angular.mock

import app from '../src/yunity';

const { module, inject } = angular.mock;

export { app, module, inject };