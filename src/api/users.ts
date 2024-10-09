import { AxiosInstance } from 'axios';
import { TUser } from '../types/TUser';

export default function (instance: AxiosInstance) {
  return {
    getAll() {
      return instance.get<TUser[]>('/users');
    },
    getOne(id: number) {
      return instance.get<TUser>(`/users/${id}`);
    },
    create(payload: Omit<TUser, 'id'>) {
      return instance.post<TUser>('/users', payload);
    },
    update(id: number, payload: Omit<TUser, 'id'>) {
      return instance.patch<TUser>(`/users/${id}`, payload);
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`/users/${id}`);
    }
  };
}
