import AuthStore from "./AuthStore";
import UIStore from "./UiStore";

class RootStore {
  uiStore = UIStore;
  authStore = AuthStore;
}

const rootStore = new RootStore();
export default rootStore;
