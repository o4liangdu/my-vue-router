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
}

export default vueRouter;