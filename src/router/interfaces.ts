export interface IRoute {
  path: string;
  name?: string;
  componentName?: string;
  redirectToName?: string;
}

// All Root Routes
export interface IAllRoutes {
  HOME: IRoute;
  SETTING: IRoute;
  WORKOUTHISTORY: IRoute;
  WORKOUTPLANS: IRoute;
  INFO: IRoute;
  LOGIN: IRoute;
  REGISTER: IRoute;
  CREATEWORKOUT: IRoute;
}
