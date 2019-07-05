// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/rem.js'
import '@/styles/common.css'

import { List, Cell, Lazyload, NavBar, Toast, Uploader, Icon, PullRefresh } from 'vant'

Vue.use(List).use(Cell).use(Lazyload).use(NavBar).use(Toast).use(Uploader).use(Icon).use(PullRefresh)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
