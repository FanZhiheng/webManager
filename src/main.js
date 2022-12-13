import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import filters from "@/filter"
import Antd from 'ant-design-vue'
import * as echarts from 'echarts';

import "ant-design-vue/dist/antd.css";
import '@/assets/css/common.scss'
import "@/assets/iconfont/iconfont.css"

const app = createApp(App)
app.config.globalProperties.$filters = filters;

app
  .use(store)
  .use(router)
  .use(Antd)

app.mount('#app')
