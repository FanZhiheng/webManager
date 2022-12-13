<template>
  <div class="homepage">
    <div class="header flex bg_fff padding_40">
      <a-avatar class="bg_2d8be0" :size="60">{{
        userName ? userName.slice(-2) : ""
      }}</a-avatar>
      <span class="margin_l_8 font_000 font_24">
        hi , <span class="font_2d8be0">{{ userName }}</span> 。 欢迎登录，
        {{ hoursNow }}好。</span
      >
    </div>

    <!-- 有数据 -->
    <div class="cardsContent bg_fff margin_t_16 margin_b_16">
      <div class="news" v-if="cardsArr.length">
        <a-row>
          <a-col
            :span="6"
            v-for="(listItem, index) in cardsArr"
            :key="index"
            :xs="8"
            :md="8"
            :xl="6"
          >
            <div class="dailyflex bg_fff padding_16">
              <span class="dailynews iconfont msg-ribaotubiao font_356EDD"></span>
              <span class="listitem font_000 font_20 textEllipsis">{{
                listItem.name
              }}</span>
              <div class="flex margin_t_16">
                <a-button
                  class="button flex margin_r_24"
                  @click="NotifyTurn(listItem, 'addNotify')"
                >
                  <span class="iconfont msg-ziyuan margin_r_16 font_2d8be0"></span>
                  <span class="font_000">发送</span>
                </a-button>
                <a-button
                  class="button flex"
                  @click="NotifyTurn(listItem, 'mailHistory')"
                >
                  <span
                    class="iconfont msg-notification-checked margin_r_16 font_2d8be0"
                  ></span>
                  <span class="font_000">日报</span>
                </a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
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
  name: "home",
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
