<template>
  <div class="homepage">
    <div class="header flex bg_fff padding_40">
      ?
      <span class="margin_l_8 font_000 font_24"> 这里是大屏</span>
    </div>

    <!-- 无数据 -->
    <div class="content flex margin_t_16 padding_40 bg_fff" v-if="!cardsArr.length">
      <img class="image" src="../../../assets/images/nodata.png" />
      <p class="margin_t_16 font_333">您名下还没有卡片，请联系管理员添加卡片！</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { getLocalStorage } from "@/utils/index";
import moment from "moment";

export default defineComponent({
  name: "bigScreen",
  setup() {
    const store = useStore();
    const Router = useRouter();
    const data = reactive({
      userName: getLocalStorage("userName1"),
      cardsArr: computed(() => store.state.PAGE.cardsArr),
      hoursNow: null,
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.homepage {
  height: 100%;
}
.header {
  align-items: center;
}
.news :deep(.ant-row > div) {
  background: transparent;
  padding: 0;
  .dailyflex {
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .dailynews {
      font-size: 64px;
    }
  }
}
.listitem {
  width: 100%;
  text-align: center;
}
.button {
  padding: 4px 24px;
  align-items: center;
  justify-content: center;
}
.content {
  height: 100%;
  flex-direction: column;
  align-items: center;
  .image {
    width: 300px;
  }
}
</style>
