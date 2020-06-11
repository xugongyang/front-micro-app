import Vue from 'vue';
import VueRouter from 'vue-router';

import {RouterView} from '@/components/layout';

Vue.use(VueRouter);

export default [
  {
    path: '/',
    name: 'product-app',
    redirect: '/product/list'
  },
  {
    path: '/product',
    name: 'product',
    meta: { title: '产品列表'},
    component: RouterView,
    redirect: '/product/list',
    children: [
      {
        path: 'list',
        name: 'product-list',
        meta: {title: '产品列表'},
        component: () => import('@/view/product/list.vue')
      }
    ]
  }
]
