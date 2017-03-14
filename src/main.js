// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './routers'
import VueRouter from 'vue-router'
import store from './vuex/user'
import Axios from 'axios'

//重置css样式
require('./style/resetcss.css');

// 开启debug模式
Vue.config.debug= true


Vue.use(VueRouter)
Vue.use(Axios)

//处理刷新时Vuex数据被清空
if(window.sessionStorage.user){
  store.commit('setUserInfo',JSON.parse(window.sessionStorage.user))
}
const router=new VueRouter({
  mode: 'history',
  routes:routers
})

 //全局路由钩子
router.beforeEach((to , form, next)=>{
        //禁止页面滚动
        let h = document.getElementsByTagName('html')[0],
            b = document.getElementsByTagName('body')[0];
            h.className = '';
            b.className = '';
            next()
})

/* eslint-disable no-new */
const app = new Vue({
   router: router,
   store: store,
  render: h => h(App)
}).$mount('#app')
