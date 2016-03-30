import 'babel-polyfill';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import ngMaterial from 'angular-material';

import yAPI from '../yunity.yAPI';
import yChat from '../yunity.yChat';
import yMap from '../yunity.yMap';

import groups from '../components/groups';
import chat from '../components/chat';
import item from '../components/item';
import login from '../components/login';
import logout from '../components/logout';
import map from '../components/map';
import profile from '../components/profile';
import signup from '../components/signup';

import initialize from './initialize';
import routes from './routes';
import materialConfig from './materialConfig';
import MainCtrl from './MainCtrl';

import routeHelperProvider from './routeHelperProvider';

import './core.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'yunity:*';
}

export default angular.module('yunity', [
  ngMaterial, uiRouter,
  yAPI, yChat, yMap,
  groups, chat, item, login, logout, map, profile, signup
])
  .provider('routeHelper', routeHelperProvider)
  .config(routes)
  .config(materialConfig)
  .controller('MainCtrl', MainCtrl)
  .run(initialize)
  .name;
