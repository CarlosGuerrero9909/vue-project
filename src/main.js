import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/general.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createVuestic } from 'vuestic-ui' // <-
import 'vuestic-ui/dist/vuestic-ui.css' // <-

createApp(App).use(router).use(VueAxios, axios).use(createVuestic()).mount('#app')  
