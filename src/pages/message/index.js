import angular from 'angular';
import ySession from '../../yunity.ySession';

import messageCtrl from './messageCtrl';

import messageTemplate from './message.html';
import messageCreateTemplate from './messageCreate.html';

export default angular.module('yunity.message', [ySession])
  .component('messagePage', {
    binding: {
      message: '@',
      type: '@',
      placeholder: '@'
    },
    transclude: true,
    controller: messageCtrl,
    controllerAs: 'ctrl',
    templateUrl(element, $attrs) {
      return (('create' in $attrs) ? messageCreateTemplate
                                   : messageTemplate);
    }
  })
  .name;
