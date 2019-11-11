<template>
  <header class="main-header">
    <!-- Logo -->
    <router-link to="dashboard" class="logo">
      <!-- mini logo - 50x50 pixels -->
      <span class="logo-mini">        
        <img src="../../../static/img/logos/logo-mini.png">
      </span>
      <!-- logo normal -->
      <span class="logo-lg">
        <img src="../../../static/img/logos/logo-lg.png">
      </span>
    </router-link>

    <!-- Cabeçalho -->
    <nav class="navbar navbar-static-top">
      <!-- Menu toggle -->
      <a class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only"></span>
      </a>
      
      <!-- Notificações -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">{{ unreadNotificationsCount }}</span>
            </a>
            <ul class="dropdown-menu">
              <li v-if="!errorNotification" class="header">Você tem {{ unreadNotificationsCount }} atividades para hoje</li>
              <li class="header" v-else>{{errorNotification}}</li>
              <li>
                <ul class="menu">
                  <!-- Notificações -->
                  <li v-for="notification in notifications" :key="notification.id">
                    <a @click.prevent.stop="goTo(notification)">
                      {{notification.message}}
                    </a>
                  </li>
                  <!--  -->
                </ul>
              </li>
              <li v-if="!errorNotification" class="footer">
                <router-link :to="{name: 'notificacoes'}">Ver todas</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--  -->

    </nav>
    <!--  -->

  </header>
</template>

<script>
export default {
  data() {
    return {
      errorNotification: null,
      unreadNotificationsCount: 0,
      notifications: [
      ]
    }
  },
  methods: {
    goTo(notification) {
      this.$router.replace({name: notification.route, params: {id: notification.id}})
    }
  },
  created() {
      let hoje = new Date(Date.now());
      let token = this.$session.get('jwt');

      this.$http.get(process.env.API_URL + "atividade/today/" + hoje.toDateString(), {headers: {Authorization: token}}).
      then(
        notificacoes => {
          notificacoes.body.data.atividadesLazer.forEach(atv => {
            this.notifications.push({id: atv.atividadesLazer[0].id, route: "verAtividadeLazer", message: atv.titulo});
          });
          notificacoes.body.data.atividadesCurso.forEach(atv => {
            this.notifications.push({id: atv.atividadesCurso[0].id, route: "verAtividadeCurso", message: atv.titulo});
          });
          notificacoes.body.data.atividadesMateria.forEach(atv => {
            this.notifications.push({id: atv.atividadesMateria[0].id, route: "verAtividadeMateria", message: atv.titulo});
          });

          if(this.notifications.length > 5)
            this.notifications = this.notifications.slice(4, -1);
          this.unreadNotificationsCount = this.notifications.length;
        },
        err => {
          this.errorNotification = "Houve um erro ao carregar as notificações!";
        });    
  }
}
</script>

<style scoped>
.main-header{
    position: fixed;
    width: available !important;
    width: -moz-available !important;          /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available !important;  /* Mozilla-based browsers will ignore this. */
}
.header {
  background: rgb(215, 224, 211) !important;
  font-weight: bold;
}
</style>