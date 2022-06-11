import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs';
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.prototype.qs = Qs;
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)


import router from './router/index.js'
import vuetify from './plugins/vuetify'
import store from './store/index.js'


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
