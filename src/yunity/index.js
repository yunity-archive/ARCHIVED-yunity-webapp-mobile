import angular from 'angular';
import ngRoute from 'angular-route';

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
import map from '../components/map';
import profile from '../components/profile';
import signup from '../components/signup';

import initialize from './initialize';
import routes from './routes';
import materialConfig from './materialConfig';
import MainCtrl from './MainCtrl';

import ngMock from 'angular-mocks';

import './core.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'yunity:*'
}

export default angular.module('yunity', [
  ngRoute,
  ngMaterial,
  'mobile-angular-ui', 'mobile-angular-ui.gestures',
  yAPI, yChat, yMap,
  groups, chat, item, login, map, profile, signup,
  ngMock
])
  .config(routes)
  .config(materialConfig)
  .controller('MainController', MainCtrl)
  .run(initialize)
  .name;