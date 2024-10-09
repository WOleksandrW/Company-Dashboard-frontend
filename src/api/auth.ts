import { AxiosInstance } from 'axios';
import { TUser } from '../types/TUser';

export default function (instance: AxiosInstance) {
  return {
    login(payload: Pick<TUser, 'email'> & { password: string }) {
      return instance.post<{ access_token: string }>('/auth/login', payload);
    },
    signUp(payload: Omit<TUser, 'id' | 'role'> & { password: string }) {
      return instance.post<TUser>('/auth/signup', payload);
    }
  };
}
