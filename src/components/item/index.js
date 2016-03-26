import angular from 'angular';

import createItemPage from './createItemPageDirective';
import listItemsPage from './listItemsPageDirective';
import itemDetailPage from './itemDetailPageDirective';

export default angular.module('yunity.item', [])
  .directive('createItemPage', createItemPage)
  .directive('listItemsPage', listItemsPage)
  .directive('itemDetailPage', itemDetailPage)
  .name;
