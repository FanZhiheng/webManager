<template>
  <a-popover placement="bottom" trigger="hover">
    <template #content>
      <p class="font_14 pointer" @click="logoutClicked">退出登录</p>
    </template>

    <div class="pointer right">
      <!-- 用户头像和昵称 -->
      <a-avatar class="avatar">
        {{ userName ? userName.slice(-2) : "" }}
      </a-avatar>

      <!-- 用户昵称 -->
      <span class="font_14 margin_l_8">{{ userName }}</span>
    </div>
  </a-popover>
</template>

<script>
import { UserOutlined, DownOutlined, UpOutlined } from "@ant-design/icons-vue";

import { reactive, toRefs, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { logout } from "@/api/login";
import { removeAllLocalStorage } from "@/utils/index";

export default defineComponent({
  name: "userLogout",
  components: {
    UserOutlined,
    DownOutlined,
    UpOutlined,
  },
  props: {
    userName: {
      type: String,
    },
    ticket: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const data = reactive({});
    const store = useStore();

    const logoutClicked = () => {
      logout({
        ticket: props.ticket,
      }).then((res) => {
        router.push({
          name: "login",
        });
        removeAllLocalStorage();
        store.commit("setCardsArr", [], 1);
      });
    };

    return {
      ...toRefs(data),
      logoutClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
.hoverUserInfo {
  height: 32px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  font-size: 10px;
  color: #fff;
}
</style>
