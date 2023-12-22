import { createApp } from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify/vuetify';
import router from '@/plugins/router/index';

const app = createApp(App);

app.use(vuetify)
app.use(router)
app.mount('#app')
