import Vue from 'vue';
// import App from './App.vue';
// import router from './router';

// 主应用中注册微应用
import { registerMicroApps, start ,setDefaultMountApp} from 'qiankun';

Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')

/**
 * [基于路由配置]
 * 通过将微应用关联到一些 url 规则的方式，实现当浏览器 url 发生变化时，自动加载相应的微应用的功能。
 * registerMicroApps(apps, lifeCycles?)
 */
registerMicroApps(
  // apps - Array<RegistrableApp> - 必选，
  [
    {
      name: 'product', // 微应用名称，确保微应用唯一
      entry: '//localhost:7702', // 微应用入口地址
      container: '#container', // 微应用的容器节点的选择器或者 Element 实例
      activeRule: '/product', // 微应用的激活规则 （支持直接配置字符串或字符串数组，当配置为字符串时会直接跟 url 中的路径部分做前缀匹配，匹配成功表明当前应用会被激活。）
    },
    {
      name: 'trade',
      entry: '//localhost:7703',
      container: '#container',
      activeRule: location => location.pathname.startsWith('/trade')
    },
  ],

  // 微应用的一些注册信息 lifeCycles - LifeCycles - 可选，全局的微应用生命周期钩子
  {
    beforeLoad: app => console.log('before load', app.name),
    beforeMount: [
      app => console.log('before mount', app.name),
    ],
  }
);

// 设置主应用启动后默认进入的微应用
setDefaultMountApp('/product');

/**
 * prefetch - boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] }) - 可选，是否开启预加载，默认为 true。
 * 配置为 true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源，配置为 'all' 则主应用 start 后即开始预加载所有微应用静态资源。
 * 配置为 'all' 则主应用 start 后即开始预加载所有微应用静态资源。
 * 配置为 string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
 * 配置为 function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)
 * sandbox - boolean | { strictStyleIsolation?: boolean } - 可选，是否开启沙箱，默认为 true。
 * 当配置为 { strictStyleIsolation: true } 表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。
 * singular - boolean | ((app: RegistrableApp<any>) => Promise<boolean>); - 可选，是否为单实例场景，默认为 true。
 * fetch - Function - 可选，自定义的 fetch 方法。
 * getPublicPath - (url: string) => string - 可选
 * getTemplate - (tpl: string) => string - 可选
 */
start({
  singular: true
});
