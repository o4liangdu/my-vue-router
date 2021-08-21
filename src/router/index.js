import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
