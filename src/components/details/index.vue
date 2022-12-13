<template>
  <div class="basic-descriptions" :style="{ padding: title ? '10px' : '' }">
    <a-descriptions
      :title="title"
      :bordered="bordered"
      :column="column"
      :size="size"
      :labelStyle="labelStyle"
    >
      <a-descriptions-item
        v-for="(item, index) in fieldItems"
        :key="index"
        :label="item.title"
      >
        <!-- text -->
        <template v-if="item.type === 'text'">
          <span v-if="item.mapKey">{{
            mapJson[item.mapKey][fieldVal[item.key]]
          }}</span>
          <span v-else>{{ fieldVal[item.key] }}</span>
        </template>

        <!-- date -->
        <template v-if="item.type === 'date'">
          <span>{{
            $filters.formatTime(fieldVal[item.key], "yyyy-MM-DD")
          }}</span>
        </template>

        <!-- dateTime -->
        <template v-if="item.type === 'dateTime'">
          <span>{{
            $filters.formatTime(fieldVal[item.key], "yyyy-MM-DD hh:mm")
          }}</span>
        </template>

        <!-- checkbox -->
        <template v-if="item.type === 'checkbox'">
          <a-checkbox
            v-for="(check, idx) in fieldVal[item.key]"
            :key="idx"
            disabled
            checked
            >{{ check }}</a-checkbox
          >
        </template>

        <!-- add -->
        <template v-if="item.type === 'add'">
          <template v-for="(txt, idx) in item.key.split(',')" :key="idx">
            {{ fieldVal[txt] }}
          </template>
        </template>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
// import BasicUploadImg from '_c/basicUploadImg'
// import BasicUploadFile from '_c/basicUploadFile'

import { defineComponent, reactive, toRefs, watch } from "vue";

// 数据字典 ep: 状态值status 对应关系 在fieldJson中指定映射关系 mapKey
import mapJson from "_j/details";

export default defineComponent({
  name: "BasicDescriptions",
  components: {
    // BasicUploadImg,
    // BasicUploadFile
  },
  props: {
    title: {
      // 标题
      type: String,
      default() {
        return "";
      },
    },
    bordered: {
      // 边框
      type: Boolean,
      default() {
        return true;
      },
    },
    size: {
      type: String,
      default() {
        return "small";
      },
    },
    labelStyle: {
      type: Object,
      default() {
        return {
          width: "200px",
        };
      },
    },
    column: {
      // 列数
      type: Number,
      default() {
        return 2;
      },
    },
    fieldKey: {
      // 需展示的描述项
      type: Array,
      default() {
        return [];
      },
    },
    fieldJson: {
      // 描述项数据源
      type: Object,
      default() {
        return {};
      },
    },
    fieldVal: {
      // 描述值
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const data = reactive({
      mapJson,
      fieldItems: [],
    });

    const createField = () => {
      let list = [];
      let showKeys = [];
      if (props.fieldKey && props.fieldKey.length) {
        showKeys = props.fieldKey;
      } else {
        for (let i in props.fieldJson) {
          showKeys.push(i);
        }
      }
      showKeys.forEach((i) => {
        list.push(props.fieldJson[i]);
      });
      data.fieldItems = list;
    };

    watch(
      () => props.fieldKey,
      () => {
        createField();
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      ...toRefs(data),
    };
  },
});
</script>
