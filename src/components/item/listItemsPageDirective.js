import listItemsTemplate from './listItemsPage.html';
import listItemsPageCtrl from './listItemsPageCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: listItemsTemplate,
    controller: listItemsPageCtrl,
    controllerAs: 'ctrl'
  };
}