import { Router, createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/constants';
import { lazyLoad } from './utils';

const routes = (): Router => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        name: ROUTES.HOME.name,
        path: '/',
        component: lazyLoad(ROUTES.HOME.componentName as string),
      },
      {
        name: ROUTES.SETTING.name,
        path: '/setting',
        component: lazyLoad(ROUTES.SETTING.componentName as string),
      },
      {
        path: '/:data(.*)',
        redirect: '/',
      },
    ],
  });
};
export default routes;
