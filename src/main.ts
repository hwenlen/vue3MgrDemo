import { createApp } from 'vue'
import './assets/css/style.less'
import './assets/css/global.less'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css';

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(ViewUIPlus)
.mount('#app')
