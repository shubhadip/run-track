import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';
import App from './App.vue';
import './assets/styles/css/app.css';
import routes from './router';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);
const router = routes();

app.use(vClickOutside);
app.use(router);
app.use(Notifications);

router.isReady().then(() => {
  app.mount('#app');
});
