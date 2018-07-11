export class SearchManager {
  constructor(main) {
    this.main = main;
    console.log(main);
    this.searchItems = [];
  }

  addSearchItem(searchItem) {
    let count = this.searchItems.filter(elem => {
      return elem.term === searchItem.term;
    }).length;

    if (count > 0) {
      console.log("A search with this term is already registered.");
      return;
    }

    searchItem.manager = this;
    this.searchItems.push(searchItem);
  }

  getSearchItems() {
    return this.searchItems;
  }

  toggleSearch(data) {
    let searchItem = this.searchItems[data.index];

    switch (data.active) {
      case true:
        searchItem.activate();
        console.log("activating search");
        break;
      case false:
        searchItem.disable();
        console.log("disabling search");
        break;

      default:
        throw Error("Missing search state");
    }
  }
}
