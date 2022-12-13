<template>
  <div class="basicHeader padding_l_24 padding_r_24">
    <a-row
      type="flex"
      justify="space-around"
      align="middle"
      class="headerContent"
    >
      <!-- logo -->
      <a-col span="18">
        <a-breadcrumb>
          <a-breadcrumb-item> {{ Route.meta.parentName }}</a-breadcrumb-item>
          <a-breadcrumb-item v-if="Route.meta.title">
            {{ Route.meta.title }}
          </a-breadcrumb-item>

          <template v-if="!Route.meta.title">
            <a-breadcrumb-item v-if="Route.query.parentName ">
              {{ Route.query.parentName }}
            </a-breadcrumb-item>
             <a-breadcrumb-item>
              {{ Route.query.title }}
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
      </a-col>

      <!-- 右边图标 -->
      <a-col span="4">
        <user-logout :user-name="userName" :ticket="ticket" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserLogout from "./components/userLogout";

import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

import { getLocalStorage } from "@/utils/index";

export default {
  name: "basicHeader",
  components: {
    UserLogout,
  },
  setup() {
    const data = reactive({
      userName: getLocalStorage("userName1"),
      ticket: getLocalStorage("ticket1"),
    });

    return {
      ...toRefs(data),
      Route: useRoute(),
    };
  },
};
</script>

<style scoped>
.basicHeader {
  position: fixed;
  top: 0;
  left: 200px;
  right: 0;
  min-width: 1300px;
  box-shadow: 0px 2px 10px 0px rgba(64, 110, 225, 0.2);
  background: #ffffff;
  z-index: 999;
}
.headerContent {
  height: 70px;
}

.menu {
  width: 120px;
  height: 90px;
  line-height: 90px;
}

.menu.active,
.menu:hover {
  background: #bccefc;
}

.menuList {
  justify-content: center;
}
</style>