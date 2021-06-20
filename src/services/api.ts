import { ILoginEmail, ILoginSuccess } from '@/shared/interface';
import { API_END_POINT } from '@/shared/settings';
import { postToHost } from './apiutils';

export const loginApi = (data: ILoginEmail): Promise<ILoginSuccess> => {
  return postToHost<ILoginSuccess>(`${API_END_POINT}login`, data);
};

export const tokenApi = (): Promise<ILoginSuccess> => {
  return postToHost<ILoginSuccess>(`${API_END_POINT}refresh-token`);
};
