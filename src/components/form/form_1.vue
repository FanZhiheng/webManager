<template>
  <div ref="formDivElem" class="margin_b_24 container">
    <a-form ref="formElem" layout="inline" :model="formData" :style="style" class="left">
      <template v-for="(item, index) in formElemItems" :key="index">
        <a-form-item :label="item.label" :name="item.name">
          <!-- 输入框 -->
          <template v-if="item.type == 'text'">
            <a-input
              v-model:value="formData[item.name]"
              :placeholder="item.placeholder"
              autoComplete="off"
            />
          </template>

          <!-- 下拉框 -->
          <template v-if="item.type == 'select'">
            <a-select
              v-model:value="formData[item.name]"
              :placeholder="item.placeholder"
              :style="{ width: '180px' }"
            >
              <template v-for="(opt, index) in item.subList" :key="index">
                <a-select-option :value="opt.key">
                  {{ opt.value }}
                </a-select-option>
              </template>
            </a-select>
          </template>

          <!-- 时间选择器 年月 -->
          <template v-if="item.type == 'date'">
            <a-date-picker
              v-model:value="formData[item.name]"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              :placeholder="item.placeholder"
            />
          </template>
        </a-form-item>
      </template>
    </a-form>

    <div class="left">
      <a-button type="primary" class="margin_r_8" @click="submit"> 查询 </a-button>
      <a-button @click="reset"> 重置 </a-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch, toRefs, defineComponent, nextTick } from "vue";

export default defineComponent({
  name: "form_1",
  emits: ["form-reset", "form-submit"],
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
  },
  setup(props, context) {
    const formElem = ref(null);
    const formDivElem = ref(null);
    const data = reactive({
      formElemItems: [],
      formData: {},
    });

    const createForm = () => {
      props.formKey.forEach((val) => {
        data.formElemItems.push(props.formJson[val]);
        data.formData[val] = props.formData[val];
        data.style = {};
      });
    };

    // 查询
    const submit = () => {
      formElem.value
        .validate()
        .then(() => {
          for (let key in data.formData) {
            if (data.formData[key] === undefined) {
              data.formData[key] = "";
            }
          }
          context.emit("form-submit", data.formData);
        })
        .catch((err) => console.log(err));
    };

    // 重置
    const reset = () => {
      formElem.value.resetFields();

      for (let key in data.formData) {
        if (data.formData[key] === undefined) {
          data.formData[key] = "";
        }
      }
      context.emit("form-reset", data.formData);
    };

    watch(
      () => props.formKey,
      (newVal, oldVal) => {
        data.formElemItems.splice(0, data.formElemItems.length);
        Object.keys(data.formData).forEach((key) => {
          delete data.formData[key];
        });
        createForm();
      },
      { deep: true }
    );

    nextTick(() => {
      const width = formDivElem.value.clientWidth - 200;
      data.style = { maxWidth: width + "px" };
    });

    createForm();

    return {
      formElem,
      formDivElem,
      ...toRefs(data),
      submit,
      reset,
    };
  },
});
</script>
