import angular from 'angular';
import ngRoute from 'angular-route';

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
import MainCtrl from './MainCtrl';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'yunity:*'
}

export default angular.module('yunity', [
  ngRoute,
  'mobile-angular-ui', 'mobile-angular-ui.gestures',
  yAPI, yChat, yMap,
  groups, chat, item, login, map, profile, signup
])
  .config(routes)
  .controller('MainController', MainCtrl)
  .run(initialize)
  .name;