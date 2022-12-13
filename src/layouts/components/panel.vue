<template>
  <div class="bg_fff">
    <div class="panel font_333 font_22 fontBold">
      <a-breadcrumb>
        <a-breadcrumb-item> {{ Route.meta.parentName }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ Route.meta.title }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "panel",
  setup() {
    return {
      Route: useRoute(),
    };
  },
});
</script>

<style scoped>
.panel {
  margin: 0 20px;
  padding: 16px 0;
  border-bottom: 1px solid #ecf4fb;
}
</style>