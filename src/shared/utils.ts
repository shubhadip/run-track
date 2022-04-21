/**
 * Debounce function
 * @param function
 * @param {number} delay, default = 200
 */
export const debounce = (fn: any, delay = 200): any => {
  let timer: number;
  return (...args: any[]): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(args);
    }, delay);
  };
};

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
