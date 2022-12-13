<template>
  <input
    type="file"
    ref="fileElem"
    class="hide"
    :value="file"
    @change="fileChange"
  />
</template>

<script>
import { defineComponent, ref, toRefs, reactive } from "vue";

export default defineComponent({
  name: "uploadFile",
  props: {
    keyName: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const fileElem = ref(null);
    const data = reactive({
      file: null,
    });

    const fileChange = () => {
      // console.log(fileElem.value.files);
      emit("file-change", {
        keyName: props.keyName,
        file: fileElem.value.files,
      });
    };

    return {
      fileElem,
      ...toRefs(data),
      fileChange,
    };
  },
});
</script>