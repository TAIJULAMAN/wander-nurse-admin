import { action, observable, computed, makeObservable, toJS } from "mobx";

class AuthStore {
  isAuthenticated = false;
  me = null;
  settings = null;
  permissionGroup = [];
  geolocation = {};
  helpers = {};

  constructor() {
    makeObservable(this, {
      isAuthenticated: observable,
      me: observable,
      settings: observable,
      permissionGroup: observable,
      helpers: observable,

      setAuth: action.bound,
      setMe: action.bound,
      setSettings: action.bound,
      setPermissionGroup: action.bound,
      setGeolocation: action.bound,
      logout: action.bound,
      setHelpers: action.bound,

      getAuth: computed,
      getMe: computed,
      getPermissionGroup: computed,
      getGeolocation: computed,
      getHelpers: computed,
    });
  }

  setAuth(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
  }

  setMe = (me) => {
    this.me = me;
  };

  setSettings = (settings) => {
    this.settings = settings;
  };

  setHelpers = (object) => {
    this.helpers = object;
  };

  setPermissionGroup = (permissionGroup) => {
    this.permissionGroup = permissionGroup;
  };

  setGeolocation = (geolocation) => {
    this.geolocation = geolocation;
  };

  logout = () => {
    this.me = null;
  };

  // GETTERS
  get getAuth() {
    return this.isAuthenticated;
  }

  get getMe() {
    return toJS(this.me);
  }

  get getSettings() {
    return toJS(this.settings);
  }

  get getHelpers() {
    return toJS(this.helpers);
  }

  get getPermissionGroup() {
    return toJS(this.permissionGroup);
  }

  get getGeolocation() {
    return toJS(this.geolocation);
  }
}

export default new AuthStore();
