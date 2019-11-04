<template>
  <header class="main-header">
    <!-- Logo -->
    <a to="dashboard" class="logo">
      <!-- mini logo - 50x50 pixels -->
      <span class="logo-mini">        
        <img src="../../../static/img/logos/logo-mini.png">
      </span>
      <!-- logo normal -->
      <span class="logo-lg">
        <img src="../../../static/img/logos/logo-lg.png">
      </span>
    </a>

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
              <li class="header">Você tem {{ unreadNotificationsCount }} notificações</li>
              <li>
                <ul class="menu">
                  <!-- Notificações -->
                  <li v-for="notification in notifications" :key="notification.id">
                    <a href="#">
                      {{notification.message}}
                    </a>
                  </li>
                  <!--  -->
                </ul>
              </li>
              <li class="footer"><a href="#">Ver todas</a></li>
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
      unreadNotificationsCount: 3,
      notifications: [
        {id: 1, message: 'Teste de notificação 1'},
        {id: 2, message: 'Teste de notificação 2'},
        {id: 3, message: 'Teste de notificação 3'},
      ]
    }
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