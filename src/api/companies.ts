import { AxiosInstance } from 'axios';
import { TCompany } from '@root/types/company.type';
import { TGetAllCompanies, TGetAllResponse } from '@root/types/types';
import { EAxiosPaths } from '@root/enums/axiosPaths.enum';

export default function (instance: AxiosInstance) {
  return {
    getAll(queriesArray?: TGetAllCompanies) {
      let queries = '';

      if (queriesArray) {
        queries =
          '?' +
          Object.entries(queriesArray)
            .filter((entry) => !!entry[1])
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
      }

      return instance.get<TGetAllResponse<TCompany>>(EAxiosPaths.COMPANIES + queries);
    },
    getOne(id: number) {
      return instance.get<TCompany>(`${EAxiosPaths.COMPANIES}/${id}`);
    },
    create(payload: FormData) {
      return instance.post<TCompany>(EAxiosPaths.COMPANIES, payload);
    },
    update(id: number, payload: FormData) {
      return instance.patch<TCompany>(`${EAxiosPaths.COMPANIES}/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`${EAxiosPaths.COMPANIES}/${id}`);
    }
  };
}
