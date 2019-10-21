import Vue from 'vue'
import Router from 'vue-router'
import Coupon from '../components/CouponDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Coupon',
      component: Coupon
    }
  ]
})
