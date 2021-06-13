import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/css/app.css';
import routes from './router';

const app = createApp(App);
const router = routes();

app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});
