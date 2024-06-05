import './assets/main.css'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";


const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(VueVideoPlayer)
app.use(VueDPlayer);

app.mount('#app')
