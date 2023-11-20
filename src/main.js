import 'md-editor-v3/lib/preview.css';
import './assets/style.css'
import './assets/tips.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import localForage from 'localforage';
localForage.config({
  name: 'global'
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
