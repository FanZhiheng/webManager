<template>
  <a-form
    ref="formElem"
    :model="submitData"
    :rules="rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    class="formPanel"
  >
    <a-row>
      <a-col :span="colspan" v-for="(item, index) in formItems" :key="index">
        <a-form-item :name="item.name" :label="item.label">
          <!-- 输入框 -->
          <template v-if="item.type == 'text'">
            <a-input
              v-model:value.trim="submitData[item.name]"
              :placeholder="item.placeholder"
              autoComplete="off"
              :disabled="item.disabled"
              :maxlength="item.limit"
            />
          </template>

          <!-- 密码 -->
          <template v-if="item.type == 'password'">
            <a-input
              v-model:value="submitData[item.name]"
              :placeholder="item.placeholder"
              type="password"
            />
          </template>

          <!-- 下拉框 -->
          <template v-if="item.type == 'select'">
            <a-select
              v-model:value="submitData[item.name]"
              :placeholder="item.placeholder"
            >
              <template v-for="(opt, index) in item.subList" :key="index">
                <a-select-option :value="opt.key">
                  {{ opt.value }}
                </a-select-option>
              </template>
            </a-select>
          </template>
          <!-- 自定下拉框 -->
          <template v-if="item.type == 'selectCustom'">
            <a-select
              v-model:value="submitData[item.name]"
              :placeholder="item.placeholder"
              @change="handleRadioChange(item.name, submitData[item.name])"
            >
              <template v-for="(opt, index) in customSubData[item.name]" :key="index">
                <a-select-option :value="opt.key">
                  {{ opt.value }}
                </a-select-option>
              </template>
            </a-select>
          </template>

          <!-- radio -->
          <template v-if="item.type == 'radio'">
            <a-radio-group
              v-model:value="submitData[item.name]"
              @change="handleRadioChange(item.name, submitData[item.name])"
            >
              <template v-for="(opt, index) in item.subList" :key="index">
                <a-radio :value="opt.key">{{ opt.value }}</a-radio>
              </template>
            </a-radio-group>
          </template>
          <template v-if="item.type == 'radioCustom'">
            <a-radio-group
              v-model:value="submitData[item.name]"
              @change="handleRadioChange(item.name, submitData[item.name])"
              class="flex"
            >
              <div
                v-for="(opt, index) in item.subList"
                :key="index"
                class="flex columns align-center margin_r_74 margin_l_8"
              >
                <img
                  v-if="opt.img"
                  :src="require(`../../assets/images/examConfig/${opt.img}.png`)"
                  alt=""
                  class="margin_b_8"
                />
                <a-radio :value="opt.key">{{ opt.value }}</a-radio>
              </div>
            </a-radio-group>
          </template>

          <!-- checkbox -->
          <template v-if="item.type == 'checkbox'">
            <a-checkbox-group
              v-model:value="submitData[item.name]"
              @change="handleRadioChange(item.name, submitData[item.name])"
            >
              <template v-for="(opt, index) in item.subList" :key="index">
                <a-checkbox :value="opt.key">{{ opt.value }}</a-checkbox>
              </template>
            </a-checkbox-group>
          </template>

          <!-- textarea -->
          <template v-if="item.type == 'textarea'">
            <a-textarea
              v-model:value.trim="submitData[item.name]"
              :placeholder="item.placeholder"
            />
          </template>

          <!-- time -->
          <template v-if="item.type == 'time'">
            <a-range-picker show-time v-model:value="submitData[item.name]">
              <template #renderExtraFooter></template>
            </a-range-picker>
          </template>

          <!-- number -->
          <template v-if="item.type == 'number'">
            <a-input-number v-model:value="submitData[item.name]" :min="0" />
          </template>

          <!-- date -->
          <template v-if="item.type === 'date'">
            <a-date-picker
              :show-time="item.showTime"
              v-model:value="submitData[item.name]"
              :placeholder="item.placeholder"
              :format="item.showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
              :value-format="item.showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
            />
          </template>

          <!-- readonly -->
          <template v-if="item.type == 'readonly'">
            {{ submitData[item.name] }}
          </template>

          <!-- file -->
          <template v-if="item.type == 'file'">
            <a-input v-model:value="submitData[item.name]" hidden />
            <!-- <a-button type="primary" @click="openFileInput(item.name)">
              上传文件
            </a-button>
          
            <span class="margin_l_8"> {{ submitData[item.name + "_"] }}</span> -->
            <a-upload
              :action="`${baseURL}file/uploadFile`"
              v-model:file-list="fileList"
              @change="({ file }) => fileChange(file, item)"
              :accept="item.accept || '.pdf'"
              :remove="(file) => removeFile(file, item)"
            >
              <a-button> 上传文件 </a-button>
            </a-upload>
          </template>
        </a-form-item>
      </a-col>
      <a-col :span="colspan">
        <slot name="extraForm"></slot>
      </a-col>
    </a-row>

    <a-row class="submit" :gutter="20" v-if="isBtn">
      <a-col span="14" offset="7">
        <a-button type="primary" @click="submit" :loading="loading">
          {{ btnTitle }}
        </a-button>
      </a-col>
    </a-row>
  </a-form>

  <!-- 上传文件 -->
  <upload-file ref="uploadFileElem" :key-name="keyName" @file-change="fileChange" />
</template>

<script>
import UploadFile from "./uploadFile";

import { reactive, ref, watch, toRefs, defineComponent } from "vue";

import RegExpRules from "@/assets/js/formRegExp";
import moment from "moment";

export default defineComponent({
  name: "basicform_2",
  components: {
    UploadFile,
  },
  props: {
    formKey: {
      type: Array,
      default() {
        return [];
      },
    },
    formJson: {
      type: Object,
      default() {
        return {};
      },
    },
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    formRequired: {
      type: Array,
      default() {
        return [];
      },
    },
    btnTitle: {
      type: String,
      default() {
        return "提交";
      },
    },
    isBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    customSubData: {
      type: Object,
      default() {
        return null;
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    colspan: {
      type: Number,
      default() {
        return 24;
      },
    },
  },
  emits: ["form-submit", "radio-change"],
  setup(props, { emit }) {
    const formElem = ref(null);
    const uploadFileElem = ref(null);
    const data = reactive({
      formItems: [],
      submitData: {},
      rules: {},
      keyName: null,
      fileList: [],
      baseURL: process.env.NODE_ENV === "production" ? "/chatbotexam/" : "/",
    });

    // 创建form元素
    props.formKey.forEach((val) => {
      data.formItems.push(props.formJson[val]);
      data.submitData[val] = props.formData[val];
    });

    // 规则
    props.formRequired.forEach((key) => {
      if (props.formKey.includes(key)) {
        let formJsonObj = props.formJson[key];
        data.rules[key] = [];
        let rule = {
          required: true,
          message: formJsonObj.errMsg,
          trigger:
            formJsonObj.type == "text" || formJsonObj.type == "textarea"
              ? "blur"
              : "change",
          type:
            formJsonObj.type == "text" ||
            formJsonObj.type == "textarea" ||
            formJsonObj.type == "select" ||
            formJsonObj.type == "selectCustom" ||
            formJsonObj.type == "password" ||
            formJsonObj.type == "radioCustom" ||
            formJsonObj.type == "radio" ||
            formJsonObj.type == "date" ||
            formJsonObj.type == "file"
              ? "string"
              : formJsonObj.type == "time"
              ? "object"
              : formJsonObj.type == "number"
              ? "number"
              : "array",
        };

        data.rules[key].push(rule);
        //  正则判断
        if (formJsonObj.RegExp) {
          let RegExpRule = RegExpRules[formJsonObj.RegExp];
          data.rules[key].push(RegExpRule);
        }
      }
    });

    // 打开file
    const openFileInput = (key) => {
      data.keyName = key;
      uploadFileElem.value.fileElem.click();
    };

    // 文件变动
    const fileChange = (file, item) => {
      if (file.status === "done") {
        if (data.fileList.length > 1) {
          data.fileList.splice(0, 1);
        }
        data.submitData[item.name] = file.response.data;
      }
    };

    const removeFile = (file, item) => {
      let idx = data.fileList.findIndex((i) => i.response.data === file);
      data.fileList.splice(idx, 1);
      data.submitData[item.name] = undefined;
    };

    const openFileList = (item) => {
      console.log(item);
    };

    // 查询
    const submit = () => {
      formElem.value
        .validate()
        .then(() => {
          for (let key in data.submitData) {
            if (data.submitData[key] === undefined) {
              data.submitData[key] = "";
            }
          }
          emit("form-submit", data.submitData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 单选
    const handleRadioChange = (key, value) => {
      emit("radio-change", { key, value });
    };

    watch(
      () => props.formKey,
      (val) => {
        data.formItems = [];
        val.forEach((key) => {
          data.formItems.push(props.formJson[key]);
        });
      },
      {
        deep: true,
      }
    );

    watch(
      () => props.formData,
      (newVal, oldVal) => {
        Object.assign(data.submitData, props.formData);
      },
      { deep: true }
    );

    return {
      formElem,
      uploadFileElem,
      ...toRefs(data),
      submit,
      openFileInput,
      fileChange,
      removeFile,
      openFileList,
      handleRadioChange,
    };
  },
});
</script>

<style scoped>
.submit {
  margin-top: 40px;
}

.formLabel {
  line-height: 32px;
}

.formPanel {
  max-width: 800px;
  margin: 0 auto;
}
</style>
