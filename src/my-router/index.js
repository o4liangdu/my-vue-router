import Vue from "vue";
// import HelloWorld from "../components/HelloWorld.vue"
// import Test from "../components/test.vue"
class HistoryRoute {
  // 记录地址信息
  constructor() {
    this.current = null;
  }
}

class vueRouter {
  constructor(options) {
    // 默认模式为hash
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    // 记录地址的对象
    this.history = new HistoryRoute();
    this.routesMap = this.createMap(this.routes)
    // 实现hashchange的监听
    this.init();
  }
  init() {
    if(this.mode === "hash") {
      location.hash?"":location.hash="/";
      window.onload = () => {
        this.history.current = location.hash.slice(1)
      };
      window.onhashchange = () => {
        this.history.current = location.hash.slice(1)
      };
    }
  }
  createMap(routes) {
    return routes.reduce((memo, current)=>{
      memo[current.path] = current.component;
      return memo;
    }, {})
  }
}

// vue插件的实现，use以后会调用
// 为保证路由唯一，需要使用单例模式
let _vue;
vueRouter.install = function(vue) {
  if(_vue ==vue && vueRouter.install.isntalled) {
    return;
  } 
  Vue.mixin({
    beforeCreate() {
      // this指向当前组件
      if(this.$options&&this.$options.router) {
        // 只有main.js里面的根组件才会传入router
        this._root = this;
        this._router = this.$options.router;
        console.log(this._router.history,"当前路由history")
        // 将current变量变为响应式的，只需在根组件中调用一次
        Vue.util.defineReactive(this, "current", this._router.history)
      } else {
        // 给所有组件都添加一个_root,指向根实例
        this._root = this.$parent._root;
      }
      Object.defineProperty(this, "$router", {
        // 这里只设置get，防止其他地方更改$router
        get: function() {
          return this._root._router;
        }
      })
      Object.defineProperty(this, "$route", {
        get: function() {
          return this._root._router.history;
        }
      })
    }
  })
  // 定义router-view组件
  Vue.component("router-view", {
    render(h) {
      // 根据hash，找到对应的components,给到h函数显示到router-view
      let current = this._self._root._router.history.current;
      let routesMap = this._self._root._router.routesMap;
      console.log(current, routesMap, "current和routesMap")
      console.log(routesMap[current],"渲染的组件")

      return h(routesMap[current])
    }
  })
}
Vue.use(vueRouter);

export default new vueRouter({
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import(/* webpackChunkName: "report" */'../components/HelloWorld.vue'),
    },
    {
      path: '/test',
      name: '路由页1',
      component: () => import(/* webpackChunkName: "report" */'../components/test.vue'),
    },
  ],
});