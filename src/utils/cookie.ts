import Cookies from 'js-cookie';

/**
 * @param name
 * @param data
 * @param url
 */
export const setCookie = (
  name: string,
  data: any,
  config?: { expires: number; path?: string; domain?: string }
): void => {
  Cookies.set(name, data, {
    expires: config?.expires,
    path: config?.path,
    domain: config?.domain,
  });
};

/**
 *
 * @param name
 * @returns
 */
export const getCookie = (name: string): any => {
  return Cookies.get(name);
};
