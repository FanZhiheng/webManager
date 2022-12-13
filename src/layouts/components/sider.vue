<template>
  <a-layout-sider style="height: 100%">
    <div class="logo">
      <img src="../../assets/images/logo.png" style="width: 100%; hegiht: 100%" alt="" />
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      class="menu-list"
    >
      <template v-for="(menu, index) in MenuData" :key="index">
        <!-- 没有二级菜单 -->
        <template v-if="!menu.children">
          <a-menu-item :key="menu.name" @click="toggleMenu(menu)">
            <span>
              <i
                class="iconfont font_FFF"
                :class="menu.icon"
                style="margin-right: 6px"
              ></i
              >{{ menu.title }}</span
            >
          </a-menu-item>
        </template>

        <!-- 有二级菜单 -->
        <template v-if="menu.children">
          <a-sub-menu :key="menu.name">
            <template #title>
              <i
                class="iconfont font_FFF"
                :class="menu.icon"
                style="margin-right: 6px"
              ></i
              >{{ menu.title }}</template
            >
            <template v-for="(menu_, index1) in menu.children" :key="index1">
              <a-menu-item
                @click="toggleMenu(menu_)"
                v-if="!menu_.children"
                :key="menu_.name"
              >
                <span>{{ menu_.title }}</span>
              </a-menu-item>

              <!-- 有三级菜单 -->
              <template v-if="menu_.children">
                <a-sub-menu :key="menu_.name">
                  <template #title> {{ menu_.title }}</template>
                  <template v-for="menu__ in menu_.children" :key="menu__.name">
                    <a-menu-item @click="toggleMenu(menu__)">
                      <span>{{ menu__.title }}</span>
                    </a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { reactive, toRefs, defineComponent, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

import MenuData from "_j/menu";
import { examGroupQuery, examQuery } from "@/api/exam";
import { addressGroupQuery } from "@/api/contact";

export default defineComponent({
  name: "sider",
  setup() {
    const Router = useRouter();
    const Route = useRoute();
    const data = reactive({
      selectedKeys: ["questionGroup"],
      openKeys: ["questionGroup"],
      MenuData: [],
    });

    const toggleMenu = (menu) => {
      Router.push({
        path: menu.routerPath,
        query: {
          title: menu.title,
          id: menu.id,
          groupId: menu.groupId,
          parentName: menu.parentName,
        },
      });
    };

    const init = () => {
      getMenu(examGroupQuery, 0, "question", "question", "/questionManage");
      // getMenu(addressGroupQuery, 1, "mail", "mail", "/mailManage/mail");
      // getMenu(examQuery, 2, "paperManage", "paperManage", null);
    };

    // 获取题库菜单
    const getMenu = (API, menuId, name, routerName, routerPath) => {
      // API({
      //   isPage: 1,
      //   pageNum: 1,
      //   pageSize: 100,
      // }).then((res) => {
      //   const menus = [];
      //   res.data.list.forEach((v, i) => {
      //     menus.push({
      //       title: v.name,
      //       name: name + v.id,
      //       routerName: routerName,
      //       routerPath: routerPath,
      //       id: v.id,
      //     });
      //     if (menuId == 2) {
      //       menus[i].children = [
      //         {
      //           title: "培训管理",
      //           name: "trainManage" + v.id,
      //           routerName: "trainManage",
      //           routerPath: "/examManage/trainManage",
      //           id: v.id,
      //           parentName: v.name,
      //         },
      //         {
      //           title: "下发培训",
      //           name: "sendTrain" + v.id,
      //           routerName: "sendTrain",
      //           routerPath: "/examManage/sendTrain",
      //           id: v.id,
      //           parentName: v.name,
      //         },
      //         {
      //           title: "试卷管理",
      //           name: "paperManage" + v.id,
      //           routerName: "paperManage",
      //           routerPath: "/examManage/paperManage",
      //           id: v.id,
      //           groupId: v.examGroupId,
      //           parentName: v.name,
      //         },
      //         {
      //           title: "试卷下发",
      //           name: "sendPaper" + v.id,
      //           routerName: "sendPaper",
      //           routerPath: "/examManage/sendPaper",
      //           id: v.id,
      //           parentName: v.name,
      //         },
      //       ];
      //     }
      //   });
      //   const len = MenuData[menuId].children.length;
      //   MenuData[menuId].children.splice(1, len, ...menus);
      data.MenuData = MenuData;
      console.log(data.MenuData);
      // });
    };

    //获取通讯录菜单
    init();

    return {
      ...toRefs(data),
      toggleMenu,
    };
  },
});
</script>

<style scoped lang="scss">
.logo {
  background: rgba(255, 255, 255, 0.2);
  padding: 13px;
  background-size: cover;
}

.sider {
  height: 100%;
}
.menu-list {
  height: calc(100% - 64px);
  overflow-y: auto;
  &::-webkit-scrollbar-track-piece {
    background-color: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 4px;
  }
}
</style>
