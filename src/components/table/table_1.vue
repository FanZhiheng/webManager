<template>
  <a-table
    :columns="columns"
    :data-source="tableValue"
    :size="size"
    :row-key="(record, index) => record.id || index"
    :pagination="false"
    :loading="loading"
    :row-selection="rowSelection"
  >
    <template v-for="key in tableKey" #[key]="{ record, index }" :key="key">
      <!-- 操作 -->
      <template v-if="key == 'action'">
        <slot name="action" :row="record">
          <a-button type="link">查看</a-button>
        </slot>
      </template>

      <!-- 序号 -->
      <template v-if="key == 'index'">
        {{ index + 1 }}
      </template>

      <!-- 手机号 -->
      <template v-if="key == 'mobile'">
        {{ $filters.formatPhone(record[key]) }}
      </template>

        <!-- 手机号 -->
      <template v-if="key == 'createTime'">
        {{ $filters.formatTime(record[key]) }}
      </template>

      <!-- 数据字典 -->
      <template v-if="dataList.includes(key)">
        {{ dataJson[key][record[key]] }}
      </template>
    </template>
  </a-table>
</template>

<script>
import { reactive, defineComponent } from "vue";

import dataJson from "@/json/data";

export default defineComponent({
  name: "table_1",
  props: {
    tableKey: {
      type: Array,
      default() {
        return [];
      },
    },
    tableJson: {
      type: Object,
      default() {
        return null;
      },
    },
    tableValue: {
      type: Array,
      default() {
        return [];
      },
    },
    size: {
      type: String,
      default() {
        return "small";
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    rowSelection: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  setup(props, context) {
    const columns = reactive([]);

    props.tableKey.forEach((key) => {
      columns.push(props.tableJson[key]);
    });

    const checkFile = (record) => {
      context.emit("check-file", record);
    };

    return {
      columns,
      dataList: ["sex", "sendStatus"],
      dataJson,
      checkFile,
    };
  },
});
</script>

<style scoped>
.yellow {
  color: rgb(241, 191, 25);
}

.green {
  color: rgb(0, 165, 0);
}

.red {
  color: rgb(255, 104, 104);
}

.gray {
  color: #999;
}

.blue {
  color: #2491ff;
}
</style>
