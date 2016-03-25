import angular from 'angular';

import createItemPage from './create-item-page';
import listItemsPage from './list-items-page';
import itemDetailPage from './item-detail-page';

export default angular.module('yunity.item', [])
  .directive('createItemPage', createItemPage)
  .directive('listItemsPage', listItemsPage)
  .directive('itemDetailPage', itemDetailPage)
  .name;