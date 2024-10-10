import './assets/main-styles.scss'
import './assets/inputs.scss'
import InlineSvg from 'vue-inline-svg';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {checkUserData, setUserData, signOut, userStore} from "@/Stores/userStore.js";
import axios from "axios";
import {getCategories} from "@/API/categoriesController.js";

const app = createApp(App)

app.use(router)
app.component('inline-svg', InlineSvg);
app.mount('#app')

if (localStorage.getItem('token') && localStorage.getItem('username')) {
    setUserData({token: localStorage.getItem('token'), username: localStorage.getItem('username')})
}
userStore.token ? axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}` : null

setInterval(() => {
    checkUserData(localStorage.getItem('token'), localStorage.getItem('username'))
}, 1800000)

if (localStorage.getItem('token') === '' || localStorage.getItem('username') === '') {
    signOut()
}

getCategories()