<template>
  <div id="app" class="theme-blue">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<style scoped>
</style>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default {
  name: "APP",
  setup () {
    return {
      zhCN
    }
  }
}
</script>