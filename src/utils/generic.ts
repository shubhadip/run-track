/**
 * Returns true if data is null or undefined
 * @param data
 */
export const isNullUndefined = (data: any): boolean => {
  return data === null || data === undefined;
};
/**
 * Returns true if data is not null
 * @param data
 */
export const isNotNull = (data: any): boolean => data !== undefined && data !== null && data !== '';

/**
 * remove style overflow from body
 */
export const removeBodyOverflow = (): void => {
  const { body } = document;
  const overflow = body.getAttribute('data-overflow');
  if (overflow !== null) {
    const value = parseInt(overflow, 10) - 1;
    if (value === 0) {
      body.style.overflow = '';
      body.removeAttribute('data-overflow');
      body.classList.remove('modal-active');
    } else {
      body.setAttribute('data-overflow', value.toString());
    }
  }
};

/**
 * add style overflow from body
 */
export const addBodyOverflow = (): void => {
  const { body } = document;
  const overflow = body.getAttribute('data-overflow');
  if (overflow === null) {
    body.setAttribute('data-overflow', '1');
    body.style.overflow = 'hidden';
    body.classList.add('modal-active');
  } else {
    body.setAttribute('data-overflow', (parseInt(overflow, 10) + 1).toString());
  }
};

/**
 * Sets data to localStorage for key
 * removes key if data is null or undefined
 * converts data to string before storing
 * @param key
 * @param data
 */
export const setData = /* istanbul ignore next */ (key: string, data: any): void => {
  if (isNullUndefined(data)) {
    localStorage.removeItem(key);
  } else {
    const dataStr: string = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, dataStr);
  }
};

/**
 * Gets data from localStorage for key
 * Returns the Type specified in T
 * Returns null if data is null or undefined
 * @param key
 */
export const getData = /* istanbul ignore next */ <T>(key: string): T | string | null => {
  const data: string | null = localStorage.getItem(key);
  if (isNotNull(data)) {
    try {
      return JSON.parse(data as string) as T;
    } catch (e) {
      return data;
    }
  }
  return null;
};

/**
 * Removes data from localStorage for key
 * @param key localStorage key
 */

/**
 * remove item from localStorage
 * @param string
 */
export const removeData = /* istanbul ignore next */ (key: string): void => {
  localStorage.removeItem(key);
};
