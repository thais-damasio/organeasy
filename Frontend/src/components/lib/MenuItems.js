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
      name: 'geral'
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
    router: {
      name: 'notificacoes'
    }
  },
  {
    type: 'item',
    icon: 'fa fa-line-chart',
    name: 'Estatísticas',
    router: {
      name: 'estatisticas'
    }
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
