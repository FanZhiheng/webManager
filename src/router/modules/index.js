import BasicLayout from '@/layouts/basicLayout'

let ROUTES = [{
  path: "/",
  redirect: "/questionManage/questionGroup",
},
{
  path: '/home',
  component: BasicLayout,
  hidden: true,
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '主页',
        menu_1: 'home'
      },
      component: () => import('@/views/common/home')
    }
  ]
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/common/login')
}]

export default ROUTES;