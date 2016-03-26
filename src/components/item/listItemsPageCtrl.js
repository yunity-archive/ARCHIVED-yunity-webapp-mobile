export default class ListItemsPageCtrl {

  constructor(yAPI) {
    'ngInject';
    Object.assign(this, { yAPI, items: [] });
    yAPI.apiCall('/items').then((ret) => {
      this.items = ret.data.items.reverse();
    });
  }

}