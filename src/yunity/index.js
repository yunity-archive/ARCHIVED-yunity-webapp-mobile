import 'babel-polyfill';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import ngMaterial from 'angular-material';

// Services
import ySession from '../yunity.ySession';
import yAPI from '../yunity.yAPI';

// Components
import login from '../pages/login';
import signup from '../pages/signup';
import profile from '../pages/profile';
import conversation from '../pages/conversation';
import message from '../pages/message';

// Initialization / configuration
import initialize from './initialize';
import routes from './routes';
import materialConfig from './materialConfig';
import exceptionConfig from './exceptionConfig';
import MainCtrl from './MainCtrl';

import routeHelperProvider from './routeHelperProvider';

import './core.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'yunity:*';
}

export default angular.module('yunity', [
  ngMaterial, uiRouter,
  ySession, yAPI,

  login, signup, profile, conversation, message
])
  .provider('routeHelper', routeHelperProvider)
  .config(routes)
  .config(materialConfig)
  .config(exceptionConfig)
  .controller('MainCtrl', MainCtrl)
  .run(initialize)
  .name;
