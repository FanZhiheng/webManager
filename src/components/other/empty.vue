<template>
  <a-empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    :image-style="{
      height: '60px',
      margin:'30px 0'
    }"
  >
    <template #description>
      <span>
        {{ text }}
      </span>
    </template>
  </a-empty>
</template>

<script>
export default {
  name: "empty",
  props: {
    text: {
      type: String,
      default() {
        return "暂无数据";
      },
    },
  },
};
</script>