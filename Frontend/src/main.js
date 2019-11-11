// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import Vuelidate from 'vuelidate'
import VueContentPlaceholders from 'vue-content-placeholders'
import VueSweetalert2 from 'vue-sweetalert2';
import '@/components/lib/css'
import '@/components/lib/script'
import moment from 'moment'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueContentPlaceholders)
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(Vuelidate);
Vue.config.productionTip = false
Vue.use(VueSweetalert2);
 
 
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
