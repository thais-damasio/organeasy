import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/components/Home/LoginPage'
import FormRegister from '@/components/Home/FormRegister'
import FormLogin from '@/components/Home/FormLogin'
import DashboardPage from '@/components/Dashboard/DashboardPage'
import CursoAtvPage from '@/components/Pages/CursoAtvPage'
import NotificacoesPage from '@/components/Pages/NotificacoesPage'
import EstatisticasPage from '@/components/Pages/EstatisticasPage'
import GeralPage from '@/components/Pages/DashboardPage'
import CadastroCurso from '@/components/Curso/CadastroCurso'
import VerCurso from '@/components/Curso/VerCurso'
import EditarCurso from '@/components/Curso/EditarCurso'
import EditarMateria from '@/components/Materia/EditarMateria'
import CadastroAtividade from '@/components/Atividade/CadastroAtividade'
import EditarAtividadeCurso from '@/components/Atividade/EditarAtividadeCurso'
import EditarAtividadeLazer from '@/components/Atividade/EditarAtividadeLazer'
import VerAtividadeCurso from '@/components/Atividade/VerAtividadeCurso'
import VerAtividadeMateria from '@/components/Atividade/VerAtividadeMateria'
import EditarAtividadeMateria from '@/components/Atividade/EditarAtividadeMateria'
import VerMateria from '@/components/Materia/VerMateria'
import VerAtividadeLazer from '@/components/Atividade/VerAtividadeLazer'

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
      path: '/', name: 'dashboard', component: DashboardPage, redirect: {name: 'geral'},
      children: [
        {
          path: 'dashboard', name: 'geral', component: GeralPage
        },
        {
          path: 'cursos-e-atividades', name: 'cursos', component: CursoAtvPage
        },
        // Cadastros
        {
          path: 'cursos/cadastro', name: 'criarCurso', component: CadastroCurso 
        },
        {
          path: 'atividades/cadastro', name: 'criarAtividade', component: CadastroAtividade 
        },
        // Ver
        {
          path: 'curso/:id', name: 'verCurso', component: VerCurso, props: true
        },
        {
          path: 'materia/:id', name: 'verMateria', component: VerMateria, props: true
        },
        {
          path: 'atividade-curso/:id', name: 'verAtividadeCurso', component: VerAtividadeCurso, props: true
        },
        {
          path: 'atividade-materia/:id', name: 'verAtividadeMateria', component: VerAtividadeMateria, props: true
        },
        {
          path: 'atividade-lazer/:id', name: 'verAtividadeLazer', component: VerAtividadeLazer, props: true
        },
        // Editar
        {
          path: 'curso/editar/:id', name: 'editarCurso', component: EditarCurso, props: true
        },
        {
          path: 'materia/editar/:id', name: 'editarMateria', component: EditarMateria, props: true
        },
        {
          path: 'atividade-curso/editar/:id', name: 'editarAtividadeCurso', component: EditarAtividadeCurso, props: true
        },
        {
          path: 'atividade-materia/editar/:id', name: 'editarAtividadeMateria', component: EditarAtividadeMateria, props: true
        },
        {
          path: 'atividade-lazer/editar/:id', name: 'editarAtividadeLazer', component: EditarAtividadeLazer, props: true
        },
        // Outros
        {
          path: 'notificacoes', name: 'notificacoes', component: NotificacoesPage
        },
        {
          path: 'estatisticas', name: 'estatisticas', component: EstatisticasPage
        },
      ]
    }
    // {
    //   // TODO
    //   path: '*', name: 'notFound', redirect: 'login'
    // }
  ]
})
