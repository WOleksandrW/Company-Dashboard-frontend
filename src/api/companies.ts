import { AxiosInstance } from 'axios';
import { TCompany } from '../types/TCompany';
import { TGetAllCompanies, TGetAllResponse } from '../types/types';

export default function (instance: AxiosInstance) {
  return {
    getAll(query?: TGetAllCompanies) {
      let path = '/companies';

      if (query) {
        const queries = Object.entries(query)
          .filter((entry) => !!entry[1])
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        path += `?${queries}`;
      }

      return instance.get<TGetAllResponse<TCompany>>(path);
    },
    getOne(id: number) {
      return instance.get<TCompany>(`/companies/${id}`);
    },
    create(payload: FormData) {
      return instance.post<TCompany>('/companies', payload);
    },
    update(id: number, payload: FormData) {
      return instance.patch<TCompany>(`/companies/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`/companies/${id}`);
    }
  };
}
