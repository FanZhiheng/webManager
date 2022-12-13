const page = {
  state: {
    curMenu: "", // 当前菜单
    openKeys: "", // 菜单展开
    cardsArr: [],
  },
  mutations: {
    // 设置一级菜单
    setMenu(state, name) {
      state.curMenu = name;
    },
    setOpenKeys(state, name) {
      state.openKeys = name;
    },
    setCardsArr(state, arr) {
      state.cardsArr.splice(0, state.cardsArr.length, ...arr);
    }
  },
  actions: {
  }
}

export default page;
