import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記
import BootstrapVue from 'bootstrap-vue' // add
import 'bootstrap/dist/css/bootstrap.css' // add
import 'bootstrap-vue/dist/bootstrap-vue.css' // add


createApp(App)
  .use(store)
  .use(router)
  // .use(BootstrapVue)
  .use(VueAxios, axios)
  .mount('#app')
