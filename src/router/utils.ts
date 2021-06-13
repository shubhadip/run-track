/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'vue';
/**
 * Returns component view of view name passed
 * @param view View's string vue file name
 * @param path Folder path from views folder
 */
export const lazyLoad = (view: string): any => {
  return (): Component => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}/${view}.vue`);
};
