const menu = {
  state: {
    examState: 0,     // 0为初始化 1为添加 2为添加成功
    menuObj1: {
      title: null,
      name: "examList",
      routerName: "examList",
      icon: "msg-home-checked",
      routerPath: "/exam/examList",
      id: null
    },
    menuObj2: {
      title: null,
      name: "examList",
      routerName: "examList",
      icon: "msg-home-checked",
      routerPath: "/exam/examList",
      id: null
    },
    menuList1: [],
    menuList2: []
  },
  mutations: {
    // 设置一级菜单
    setExamState(state, status) {
      console.log("vuex-setExamState:::::::", status)
      state.examState = status;
    },
  },
  actions: {
  }
}

export default menu;
