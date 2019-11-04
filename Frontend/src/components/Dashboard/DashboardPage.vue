<template>
  <div class="wrapper">
    <navbar></navbar>
    <sidebar :menuItems="menuItems" :currentUser="currentUser"></sidebar>
    <content-wrap></content-wrap>
  </div>
</template>

<script>
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import ContentWrap from './ContentWrap'
import MenuItems from '../lib/MenuItems.js'

export default {
  data () {
    return {
      menuItems: MenuItems,
      currentUser: {}
    }
  },
  // Lifecycles
  // Busca dados do usuário logado
  created() {
    this.currentUser = this.$session.get('credential');
  },
  //Redireciona usuário autenticado
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push({ name: 'login'})
    }
  },
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar,
    'content-wrap': ContentWrap,
  },
}
</script>

