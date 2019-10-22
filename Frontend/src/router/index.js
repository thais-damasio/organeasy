import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Home/LoginPage'
import FormRegister from '@/components/Home/FormRegister'
import FormLogin from '@/components/Home/FormLogin'
import DashboardPage from '@/components/Dashboard/DashboardPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'home', component: LoginPage, redirect: 'login',
      children: [{
        path: 'register', name: 'register', component: FormRegister 
      },
      {
        path: 'login', name: 'login', component: FormLogin 
      }]
    },
    {
      path: '/dashboard', name: 'dashboard', component: DashboardPage
    }
    // {
    //   // TODO
    //   path: '*', name: 'notFound', redirect: 'login'
    // }
  ]
})
