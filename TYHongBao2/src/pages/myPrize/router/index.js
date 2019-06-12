import Vue from 'vue'
import Router from 'vue-router'
import MyPrize from '../components/MyPrize.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyPrize',
      component: MyPrize
    }
  ]
})
