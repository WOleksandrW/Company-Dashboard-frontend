import { AxiosInstance } from 'axios';
import { TCompany } from '../types/TCompany';

export default function (instance: AxiosInstance) {
  return {
    getAll() {
      return instance.get<TCompany[]>('/companies');
    },
    getOne(id: number) {
      return instance.get<TCompany>(`/companies/${id}`);
    },
    create(payload: Omit<TCompany, 'id'>) {
      return instance.post<TCompany>('/companies', payload);
    },
    update(id: number, payload: Omit<TCompany, 'id'>) {
      return instance.patch<TCompany>(`/companies/${id}`, payload);
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`/companies/${id}`);
    }
  };
}
