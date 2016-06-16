import 'babel-polyfill';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import ngMaterial from 'angular-material';

// Services
import yAPI from '../yunity.yAPI';
import yConversation from '../yunity.yConversation';

// Component directives
import yMessage from '../pages/message';

// Route related directives
import login from '../pages/login';
import logout from '../pages/logout';
import signup from '../pages/signup';
import profile from '../pages/profile';
import conversation from '../pages/conversation';

// Misc directives
import showLoggedInDirective from './showLoggedInDirective';
import hideLoggedInDirective from './hideLoggedInDirective';

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
  ngMaterial, uiRouter, yAPI, yConversation, yMessage,

  login, logout, signup,  profile, conversation
])
  .provider('routeHelper', routeHelperProvider)
  .config(routes)
  .config(materialConfig)
  .config(exceptionConfig)
  .controller('MainCtrl', MainCtrl)
  .directive('showLoggedIn', showLoggedInDirective)
  .directive('hideLoggedIn', hideLoggedInDirective)
  .run(initialize)
  .name;
