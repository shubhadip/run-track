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
  WORKOUTHISTORY: {
    path: '/workouthistory',
    name: 'workouthistory',
    componentName: 'workouthistory',
  },
  WORKOUTPLANS: {
    path: '/workoutplans',
    name: 'workoutplans',
    componentName: 'workoutplans',
  },
  INFO: {
    path: '/info',
    name: 'info',
    componentName: 'info',
  },
  LOGIN: {
    path: '/login',
    name: 'login',
    componentName: 'login',
  },
  REGISTER: {
    path: '/register',
    name: 'register',
    componentName: 'register',
  },
  CREATEWORKOUT: {
    path: '/createworkout',
    name: 'createworkout',
    componentName: 'createworkout',
  },
};
