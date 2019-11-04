import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Home/LoginPage'
import FormRegister from '@/components/Home/FormRegister'
import FormLogin from '@/components/Home/FormLogin'
import DashboardPage from '@/components/Dashboard/DashboardPage'
import CursoPage from '@/components/Curso/CursoPage'
import FormCadastroCurso from '@/components/Curso/FormCadastro'
import FormCadastroAtividade from '@/components/Curso/FormAtividade'

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
      path: '/dashboard', name: 'dashboard', component: DashboardPage,
      children: [
        {
          path: 'cursos-e-atividades', name: 'cursos', component: CursoPage
        },
        {
          path: 'cursos/cadastro', name: 'createCurso', component: FormCadastroCurso 
        },
        {
          path: 'atividades/cadastro', name: 'createAtividade', component: FormCadastroAtividade 
        }
      ]
    }
    // {
    //   // TODO
    //   path: '*', name: 'notFound', redirect: 'login'
    // }
  ]
})
