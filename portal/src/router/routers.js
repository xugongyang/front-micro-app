import {RouterView} from '@/components/layout';

export default [
  {
    path: '/',
    meta: {
      title: '前端微应用'
    },
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    name: 'workbench',
    meta: { title: '工作台'},
    component: RouterView,
    redirect: '/workbench/index',
    children: [
      {
        path: 'index',
        name: 'workbench-index',
        meta: {title: '工作台'},
        component: () => import('@/view/workbench/index.vue')
      }
    ]
  }
]
