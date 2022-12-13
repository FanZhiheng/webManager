import BasicLayout from '@/layouts/basicLayout'

let ROUTES = [{
  path: "/",
  redirect: "/login",
},
{
  path: '/bigScreen',
  component: BasicLayout,
  hidden: true,
  children: [
    {
      path: '/bigScreen',
      name: 'bigScreen',
      meta: {
        title: '首页看板',
        menu_1: 'bigScreen'
      },
      component: () => import('@/views/common/bigScreen')
    }
  ]
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/common/login')
}]

export default ROUTES;