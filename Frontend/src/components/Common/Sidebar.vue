<template>
  <aside id="slider" class="main-sidebar">
    
    <section class="sidebar">
      <!-- Dados do usuário -->
      <div class="user-panel">
        <div class="pull-left image">
          <img :src="currentUser.avatar" class="img-circle">
        </div>
        <div class="pull-left info">
          <p>{{ currentUser.name }}</p>
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
        >
        </sidebar-item>
      </ul>
    </section>
    
  </aside>
</template>

<script>
// import { mapGetters } from 'vuex'
import sidebarItems from './SidebarItem'

export default {
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
