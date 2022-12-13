<template>
  <div class="bg_fff">
    <a-layout style="height: 100vh">
      <!-- 侧边栏 -->
      <sider />

      <a-layout>
        <a-layout-header>
          <basic-header />
        </a-layout-header>

        <a-layout-content>
          <div class="notificationLayout maxHeight">
            <div class="padding_24 maxHeight" style="overflow: auto">
              <!-- 标签页 -->
              <!-- <router-view name="panel" /> -->
              <router-view :key="routeKey" />
            </div>
          </div>

          <!-- <a-layout-footer>Footer</a-layout-footer> -->
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import BasicHeader from "./components/basicHeader";
import Sider from "./components/sider";

import { watch, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "basicLayout",
  components: {
    BasicHeader,
    Sider,
  },
  setup() {
    const Route = useRoute();
    const data = reactive({
      routeKey: "",
    });
    // 解决复用组件 路由不刷新的问题
    watch(
      () => Route.query,
      (val) => {
        data.routeKey = new Date().getTime();
      },
      {
        immediate: true,
        deep: true,
      }
    );

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.notificationLayout {
  min-width: 1100px;
  margin: 0 auto;
  background: #f0f2f5;
}
</style>
