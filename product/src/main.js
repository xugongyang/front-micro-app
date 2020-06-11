import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router/routers';

Vue.config.productionTip = false;

/**
 * 微应用静态资源一定要支持跨域
 * qiankun 将会在微应用 bootstrap 之前注入一个运行时的 publicPath 变量
 * runtime publicPath 主要解决的是微应用动态载入的 脚本、样式、图片 等地址不正确的问题。
 */
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}

let router = null;  // 路由
let instance = null; // vue实例

// 微应用渲染方法
function render() {
	router = new VueRouter({
		base: window.__POWERED_BY_QIANKUN__ ? '/product' : '/',
		mode: 'history',
		routes,
	});

	router.beforeEach((to, from, next) => {
	  const title = to.meta && to.meta.title;
	  if (title) {
	    document.title = title;
	  }
	  next();
	});

	instance = new Vue({
		router,
		render: h => h(App),
	}).$mount('#app');
}

// 独立项目运行时 渲染
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('产品微应用初始化 bootstrap');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
	console.log('产品微应用渲染', props);
	render();
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
	console.log('产品微应用卸载');
	instance.$destroy();
	instance = null;
	router = null;
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp(手动加载) 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
