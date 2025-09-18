import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import VOtpInput from "vue3-otp-input";
import '../src/assets/main.css'
import store from "./store";
import "./style.css"
const spinner = defineAsyncComponent(
    () => import('../src/components/common/spinner.vue'));

const app = createApp(App)
app.use(store)
app.use(router)
app.component('v-otp-input', VOtpInput)
app.component("spinner", spinner);
app.mount('#app')

