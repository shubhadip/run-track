import { ErrorCode } from '@/shared/interface';
import { getFromHost, postToHost, patchToHost, get, post } from './apiutils';
import apiClient from './axios.instances';
// todo: setup refresh-token, access-token apis & headers
/**
 * Get Default Headers
 */
export const getDefaultHeaders = (): any => {
  return {};
};

/**
 * retry request on app if failed for 401
 * @param errorConfig
 */
export const retryHandler = (errorConfig: any): any => {
  try {
    // refetch new accessToken and continue
    // if this fails open login modal
    return apiClient.request(errorConfig.config);
  } catch (err) {
    console.error('retryHandler', err);
  }
};
/**
 * request response interceptors
 */
export const httpInterceptors = (): void => {
  apiClient.interceptors.request.use(async (config: any) => {
    const defaultHeaders = await getDefaultHeaders();

    config.headers = {
      ...config.headers,
      ...defaultHeaders,
    };
    return config;
  });

  /**
   * intercept API response for unauthorized and server errors
   * invokes login modal in case of unauthorized error
   * shows error boundry in case of server error or empty error response
   */
  const SERVER_ERROR_END = 599;
  apiClient.interceptors.response.use(
    (response: any) => response,
    async (error: any): Promise<any> => {
      const { status } = error?.response || {};
      if (status === ErrorCode.UNAUTHORIZED) {
        const value = await retryHandler(error);
        if (value) {
          return value;
        }
      } else if (!status || (status >= ErrorCode.INTERNAL_SERVER_ERROR && status <= SERVER_ERROR_END)) {
        // open error modal for internal server error
      }
      return Promise.reject(error);
    }
  );
};

export { getFromHost, postToHost, patchToHost, get, post };
