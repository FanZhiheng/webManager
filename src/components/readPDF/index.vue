<template>
  <div v-if="id !== ''">
    <iframe :src="`${pdfLink}#toolbar=0`" class="pdfWindow maxWidth"></iframe>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { downloadGet } from "@/api/file";

export default defineComponent({
  props: {
    id: {
      type: String,
      default() {
        return "";
      },
    },
  },
  setup(props) {
    // console.log(props.id)
    const data = reactive({
      pdfLink: "",
    });
    downloadGet({
      fileNum: props.id,
    }).then((res) => {
      // console.log(res.data);
      let blob = new Blob([res.data], {
        type: "application/pdf;charset=utf-8",
      });
      data.pdfLink = window.URL.createObjectURL(blob);
      // console.log(data.pdfLink)
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.pdfWindow {
  height: 550px;
}
</style>
