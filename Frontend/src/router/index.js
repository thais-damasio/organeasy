import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Home/LoginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'login', component: LoginPage
    }
  ]
})
