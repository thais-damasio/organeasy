import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Home/LoginPage'
import FormRegister from '@/components/Home/FormRegister'
import FormLogin from '@/components/Home/FormLogin'

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
    }
  ]
})
