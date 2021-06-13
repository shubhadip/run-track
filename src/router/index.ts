import { Router, createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/constants';
import { lazyLoad } from './utils';

const routes = (): Router => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: lazyLoad(ROUTES.HOME.componentName as string),
      },
      {
        path: '/',
        component: lazyLoad(ROUTES.HOME.componentName as string),
      },
      {
        path: '/:data(.*)',
        redirect: '/',
      },
    ],
  });
};
export default routes;
