<template>
  <div class="login-panel">
    <slot name="title"></slot>

    <a-form
      ref="formELem"
      :model="model"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="userName">
        <a-input v-model:value="model.userName" placeholder="请输入登录账号">
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input
          v-model:value="model.password"
          placeholder="请输入登录密码"
          type="password"
        >
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input>
      </a-form-item>
      <div class="wrap-identify">
        <a-form-item name="code">
          <a-input
            v-model:value="model.code"
            placeholder="请输入图形验证码"
            autoComplete="off"
          >
            <template #prefix>
              <safety-outlined />
            </template>
          </a-input>
        </a-form-item>
        <div class="img" @click="refreshCode">
          <identify :identifyCode="identifyCode" />
        </div>
      </div>
      <a-form-item>
        <a-button type="primary" block size="large" @click="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Identify from "./identify";
import { token } from "@/api/login";
import { reactive, ref, toRefs } from "vue";
import { UserOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons-vue";
import { encrypt } from "@/utils/encrypt";
export default {
  name: "loginPanel",
  components: {
    Identify,
    UserOutlined,
    LockOutlined,
    SafetyOutlined,
  },
  setup(props, { emit }) {
    const formELem = ref();
    const validateCode = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码");
      } else {
        if (data.model.code !== data.identifyCode) {
          return Promise.reject("验证码填写有误");
        }
        return Promise.resolve();
      }
    };

    const data = reactive({
      model: {
        userName: "",
        password: "",
        code: "",
        token: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
      },
      identifyCode: "",
      token: "",
    });

    const getToken = () => {
      token({
        // token: data.identifyCode,
      }).then((res) => {
        console.log(res)
        data.token = res.token;
        // console.log(this.token);
      });
    };

    getToken();
    const refreshCode = () => {
      let pools = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      let str = "";
      for (var i = 0; i < 4; i++) {
        var c = pools[randomNum(0, pools.length - 1)]; // 随机的字
        str += c;
      }
      data.identifyCode = str;
    };

    const randomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const submit = () => {
      formELem.value
        .validate()
        .then(() => {

					let token = encrypt(
            data.model.userName,
            data.model.password,
            data.token
          );
          data.model.token = token;
          emit("login-submit", data.model);
        })
        .catch(() => {});
    };

    refreshCode();

    return {
      ...toRefs(data),
      formELem,
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
      refreshCode,
      submit,
    };
  },
};
</script>

<style lang="scss">
.login-panel {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 2px #014b8f;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  .wrap-identify {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      margin: 0 0 18px 10px;
      cursor: pointer;
    }
  }
}
</style>
