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
import yMap from '../yunity.yMap';

// Component directives
import yMessage from '../components/message';
import yWall from '../components/wall';

// Route related directives
import login from '../components/login';
import logout from '../components/logout';
import signup from '../components/signup';
import profile from '../components/profile';
import groups from '../components/groups';
import conversation from '../components/conversation';
import item from '../components/item';
import map from '../components/map';

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
  ngMaterial, uiRouter,
  yAPI, yConversation, yMap,
  yMessage, yWall,
  
  login, logout, signup,
  profile, groups, conversation,
  item, map
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
