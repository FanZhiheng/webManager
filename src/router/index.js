import { createRouter, createWebHashHistory } from "vue-router";
import { getLocalStorage } from "@/utils"

import COMMON_ROUTER from "./modules/index"

const routes = [...COMMON_ROUTER];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   let ticket = getLocalStorage('userId1')
//   if (to.name === 'login') {
//     next()
//   }
//   if (ticket) {
//     next()
//   } else {
//     next('/login')
//   }
// })

export default router
