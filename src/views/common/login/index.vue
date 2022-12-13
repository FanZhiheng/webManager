<template>
  <div class="login-page">
    <div class="logo"></div>
    <login-panel @login-submit="submit">
      <template #title>
        <p class="title">客户登录</p>
      </template>
    </login-panel>
  </div>
</template>

<script>
import LoginPanel from "@/components/loginPanel";

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

import { login } from "@/api/login";
import { setLocalStorage } from "@/utils/index";

export default defineComponent({
  name: "login",
  components: {
    LoginPanel,
  },
  setup() {
    const router = useRouter();
    const submit = (data) => {
      let params = {
        // loginName: data.userName,
        // password: data.password,
        token: data.token,
        type: 1,
      };
      console.log(params);

      router.push({
        name: "bigScreen",
      });
      // login(params)
      //   .then((res) => {
      //     message.success("登录成功");
      //     setLocalStorage("ticket1", res.ticket);
      //     setLocalStorage("userName1", res.userName);
      //     setLocalStorage("userId1", res.userId);

      //     router.push({
      //       name: "questionGroup",
      //     });
      //   })
      //   .catch((err) => {});
    };
    return {
      submit,
    };
  },
});
</script>

<style lang="scss">
.login-page {
  min-width: 1200px;
  height: 100%;
  background: url(../../../assets/images/login-bg.png) no-repeat;
  background-size: cover;
  position: relative;
  // background-position-y: bottom;
  .logo {
    width: 320px;
    height: 72px;
    background: url(../../../assets/images/logo.png) no-repeat;
    background-size: contain;
    position: absolute;
    left: 16px;
    top: 10px;
  }
  .title {
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #3a404a;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  .login-panel {
    left: 80%;
    transform: translate(-50%, -50%);
  }
}
</style>
