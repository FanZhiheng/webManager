import { createStore } from "vuex";

import PAGE from "./modules/page";
import MENU from "./modules/menu";

export default createStore({
  modules: {
    PAGE,
    MENU
  }
})
