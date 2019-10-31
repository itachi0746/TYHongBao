import Vue from 'vue'
import Router from 'vue-router'
import MyActivity from '../components/Activity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyActivity',
      component: MyActivity
    }
  ]
})
