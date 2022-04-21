/* eslint-disable @typescript-eslint/indent */
/**
 * handles appending hash to route when component is mounted, removes hash on close
 * @param router routerObject of product
 * @param route  current route object of product
 */
export function useRouterHash(
  router: any | undefined,
  route: any | undefined
): {
  routerBack: () => void;
  appendHashToRoute: (hashString?: string) => void;
} {
  const routerObj = router;
  const routeObj = route;

  /**
   * remove hash from url
   */
  const routerBack = (): void => {
    if (routeObj && routeObj.hash) {
      routerObj.back();
    }
  };

  /**
   * append hash to Url
   */
  const appendHashToRoute = (hashString?: string): void => {
    routerObj &&
      routerObj.push({
        hash: hashString,
      });
  };

  return {
    routerBack,
    appendHashToRoute,
  };
}
