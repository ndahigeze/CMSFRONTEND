/*!

=========================================================
* Vue Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import styles from './assets/css/nucleo/clear_blog.module.css';
import Vue from 'vue';
import {
  Table,
  TableColumn,
    Pagination,
    Loading
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading.directive)
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import {store} from './store/appStore'
import VueSweetalert2 from 'vue-sweetalert2';
import { DataTables } from "vue-data-tables";
import {
  alert
} from "./util/alertUtils";

Vue.prototype.$alert = alert
Vue.use(VueSweetalert2);  
// router setup
import {router} from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(alert)
Vue.use(DataTables)

window.onload = () => {
    store.dispatch("refreshToken")
}
new Vue({
   router,
  store,
  el: '#app',
  render: h => h(App),
 
});
