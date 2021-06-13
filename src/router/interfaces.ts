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
  PREVIOUSWORKOUTS: IRoute;
  INFO: IRoute;
}
