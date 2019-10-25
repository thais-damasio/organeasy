// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import Vuelidate from 'vuelidate'
import VueContentPlaceholders from 'vue-content-placeholders'
import '@/components/lib/css'
import '@/components/lib/script'


Vue.use(VueContentPlaceholders)
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(Vuelidate);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
