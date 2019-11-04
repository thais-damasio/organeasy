<template>
  <aside id="slider" class="main-sidebar">
    
    <section class="sidebar">
      <!-- Dados do usuário -->
      <div class="user-panel">
        <div class="pull-left image">
          <img :src="'static/img/avatar/' + (currentUser.avatar.path || noneAvatar)" class="img-circle">
        </div>
        <div class="pull-left info">
          <!-- Nome do usuário -->
          <content-placeholders :rounded="true" v-if="!currentUser.nome">
            <content-placeholders-text :lines="1" />
          </content-placeholders>
          <p v-else>
            {{ currentUser.nome }}
          </p>
          <!--  -->
          <span>{{currentDate}}</span>
        </div>
      </div>
      
      <!-- Menus -->
      <ul data-widget="tree" class="sidebar-menu">
        <sidebar-item
          v-for="(item,index) in menuItems"
          :data="item"
          :key="index"
          :type="item.type"
          :isHeader="item.isHeader"
          :icon="item.icon"
          :name="item.name"
          :badge="item.badge"
          :items="item.items"
          :router="item.router"
          :link="item.link"
          :logout="item.logout"
        >
        </sidebar-item>
      </ul>
    </section>
    
  </aside>
</template>

<script>
import sidebarItems from './SidebarItem'
let noneAvatar = require('../../../static/img/avatar/none.svg');

export default {
  data() {
    return {
      noneAvatar: noneAvatar
    }
  },
  props: {
    menuItems: {
      type: Array,
      default: []
    },
    currentUser: {
      type: Object,
      default: {}
    }
  },
  computed: {
    currentDate: function() {
      let date = new Date(Date.now());

      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
  },
  components: {
    'sidebar-item': sidebarItems
  }
}
</script>

<style scoped>
.main-sidebar{
  position: fixed;
}
</style>
