import Vue from 'vue';
import VueRouter from 'vue-router';

import {RouterView} from '@/components/layout';

Vue.use(VueRouter);

export default [
  {
    path: '/',
    name: 'trade-app',
    redirect: '/trade/list'
  },
  {
    path: '/trade',
    name: 'trade',
    meta: { title: '订单'},
    component: RouterView,
    redirect: '/trade/list',
    children: [
      {
        path: 'list',
        name: 'trade-list',
        meta: {title: '订单列表'},
        component: () => import('@/view/trade/list.vue')
      }
    ]
  }
]
