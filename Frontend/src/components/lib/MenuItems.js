module.exports = [
  {
    type: 'item',
    isHeader: true,
  },
  {
    type: 'item',
    icon: 'fa fa-home',
    name: 'Home',
    router: {
      name: 'dashboard'
    }
  },
  {
    type: 'item',
    icon: 'fa fa-calendar',
    name: 'Cursos e Atividades',
    router: {
      name: 'cursos'
    }
  },
  {
    type: 'item',
    icon: 'fa fa-bell',
    name: 'Notificações',
    // router: {
    //   name: 'WidgetsExample'
    // }
  },
  {
    type: 'item',
    icon: 'fa fa-line-chart',
    name: 'Estatísticas',
    // router: {
    //   name: 'WidgetsExample'
    // }
  },
  {
    type: 'item',
    icon: 'fa fa-graduation-cap',
    name: 'Notas',
    // router: {
    //   name: 'WidgetsExample'
    // }
  },
  {
    type: 'item',
    isHeader: true,
  },
  {
    type: 'item',
    icon: 'fa fa-sign-out',
    name: 'Sair',
    logout: true
  },
]
