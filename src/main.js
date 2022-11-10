import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vSelect from "vue-select";
import 'sweetalert2/src/sweetalert2.scss'
import "vue-select/dist/vue-select.css";

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .component("v-select", vSelect)
    .mount('#app')
