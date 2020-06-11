import Vue from 'vue';
import Router from 'vue-router';
import routes from './routers';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});

// 路由处理
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  
  next();
});


export default router;
