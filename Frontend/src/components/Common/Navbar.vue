<template>
  <header class="main-header">
    <!-- Logo -->
    <a to="dashboard" class="logo">
      <!-- mini logo - 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo normal -->
      <span class="logo-lg"><b>Admin</b>LTE</span>
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
              <!-- <span class="label label-warning">{{ unreadNotificationsCount }}</span> -->
            </a>
            <ul class="dropdown-menu">
              <!-- <li class="header">You have {{ unreadNotificationsCount }} notifications</li> -->
              <li>
                <ul class="menu">
                  <li>
                    <a href="#">
                      5 new members joined today
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
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
// import { mapGetters } from 'vuex'

export default {
//   computed: {
//     ...mapGetters([
//       'unreadMessagesCount',
//       'unreadNotificationsCount',
//       'remainTasksCount',
//       'currentUser'
//     ])
//   }
}

</script>
