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
        name: ROUTES.WORKOUTHISTORY.name,
        path: '/workouthistory',
        component: lazyLoad(ROUTES.WORKOUTHISTORY.componentName as string),
      },
      {
        name: ROUTES.WORKOUTPLANS.name,
        path: '/workoutplans',
        component: lazyLoad(ROUTES.WORKOUTPLANS.componentName as string),
      },
      {
        name: ROUTES.INFO.name,
        path: '/info',
        component: lazyLoad(ROUTES.INFO.componentName as string),
      },
      {
        name: ROUTES.LOGIN.name,
        path: '/login',
        component: lazyLoad(ROUTES.LOGIN.componentName as string),
      },
      {
        name: ROUTES.REGISTER.name,
        path: '/register',
        component: lazyLoad(ROUTES.REGISTER.componentName as string),
      },
      {
        name: ROUTES.CREATEWORKOUT.name,
        path: '/createworkout',
        component: lazyLoad(ROUTES.CREATEWORKOUT.componentName as string),
      },
      {
        path: '/:data(.*)',
        redirect: '/',
      },
    ],
  });
};
export default routes;
