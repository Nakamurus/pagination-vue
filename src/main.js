import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://newsapi.org/v2/top-headlines'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
}).$mount('#app')
