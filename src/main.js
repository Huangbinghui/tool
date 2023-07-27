import {createApp} from 'vue'
import App from './App.vue'
import naive from "naive-ui"
import router from "./router/index.js"
import {debounce} from "@/utils/index.js";


const app = createApp(App)
app.use(naive).use(router)
app.config.globalProperties.debounce = debounce
app.mount('#app')
