import { IAllRoutes } from '@/router/interfaces';

export const ROUTES: IAllRoutes = {
  HOME: {
    path: '/',
    name: 'home',
    componentName: 'home',
  },
  SETTING: {
    path: '/setting',
    name: 'setting',
    componentName: 'setting',
  },
  PREVIOUSWORKOUTS: {
    path: '/prevworkouts',
    name: 'prevworkouts',
    componentName: 'prevworkouts',
  },
  INFO: {
    path: '/info',
    name: 'info',
    componentName: 'info',
  },
};
