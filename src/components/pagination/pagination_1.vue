<template>
  <div class="margin_t_24 textRight flex align-center just-end">
    <a-pagination
      v-model:current="currentPage"
      :total="total"
      show-less-items
      :show-total="(total) => `共 ${total} 条`"
      @change="pageChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, watch } from "vue";

export default defineComponent({
  name: "pagination_1",
  props: {
    current: {
      type: Number,
      default() {
        return 1;
      },
    },
    total: {
      type: Number,
    },
  },
  setup(props, context) {
    const data = reactive({
      currentPage: 0,
    });

    const pageChange = (page) => {
      context.emit("page-change", page);
    };

    watch(
      () => props.current,
      (newV) => {
        data.currentPage = +newV;
      }
    );

    data.currentPage = +props.current;

    return {
      ...toRefs(data),
      pageChange,
    };
  },
});
</script>
