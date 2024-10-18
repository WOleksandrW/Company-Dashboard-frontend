import { AxiosInstance } from 'axios';
import { TUser } from '../types/user.type';
import { TSignInBody, TSignUpBody } from '../types/types';

export default function (instance: AxiosInstance) {
  return {
    login(payload: TSignInBody) {
      return instance.post<{ access_token: string; refresh_token: string }>('/auth/login', payload);
    },
    signUp(payload: TSignUpBody) {
      return instance.post<TUser>('/auth/signup', payload);
    },
    resetPassword(payload: TSignInBody) {
      return instance.post('/auth/reset-password', payload);
    }
  };
}
