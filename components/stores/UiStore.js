import { action, observable, computed, makeObservable, toJS } from "mobx";

class UIStore {
  isLoading = false;
  currentExpandedMenus = [];
  selectedSidebarMenu = "";
  isSidebarOpen = false;
  rowExpandable = false;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      currentExpandedMenus: observable,
      selectedSidebarMenu: observable,
      isSidebarOpen: observable,
      rowExpandable: observable,

      setIsLoading: action,
      setCurrentExpandedMenus: action,
      setSelectedSidebarMenu: action,
      toggleSidebar: action,
      showLoader: action,
      hideLoader: action,
      toggleRowExpandable: action,

      getCurrentExpandedMenus: computed,
      getSelectedSidebarMenu: computed,
    });
  }

  setIsLoading = (val) => {
    this.isLoading = val;
  };

  setCurrentExpandedMenus = (expandMenuList, checkExpandMenu) => {
    let result = [];
    if (this.currentExpandedMenus.length === 0) {
      result = expandMenuList;
    } else if (
      expandMenuList.every((item) => this.currentExpandedMenus.includes(item))
    ) {
      const filteredExpandedMenuList = expandMenuList.filter(
        (item) => item !== checkExpandMenu
      );
      result = filteredExpandedMenuList;
    } else {
      result = expandMenuList;
    }
    this.currentExpandedMenus = result;
  };

  setSelectedSidebarMenu = (value) => {
    this.selectedSidebarMenu = value;
  };

  toggleSidebar = () => {
    this.isSidebarOpen = !this.isSidebarOpen;
  };

  showLoader = () => {
    this.isLoading = true;
  };

  hideLoader = () => {
    this.isLoading = false;
  };

  toggleRowExpandable = () => {
    this.rowExpandable = !this.rowExpandable;
  };

  get getCurrentExpandedMenus() {
    return toJS(this.currentExpandedMenus);
  }
  get getSelectedSidebarMenu() {
    return toJS(this.selectedSidebarMenu);
  }
}

export default new UIStore();
