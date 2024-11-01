import { AxiosInstance } from 'axios';
import { TUser } from '@root/types/user.type';
import { TGetAllResponse, TGetAllUsers, TPatchUser, TSignUpBody } from '@root/types/types';
import { ERole } from '@root/enums/role.enum';

export default function (instance: AxiosInstance) {
  return {
    getAll(query?: TGetAllUsers) {
      let path = '/users';

      if (query) {
        const queries = Object.entries(query)
          .filter((entry) => !!entry[1])
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        path += `?${queries}`;
      }

      return instance.get<TGetAllResponse<TUser>>(path);
    },
    getMe() {
      return instance.get<TUser>('/users/me');
    },
    getOne(id: number) {
      return instance.get<TUser>(`/users/${id}`);
    },
    create(payload: TSignUpBody & { role: ERole.USER | ERole.ADMIN }) {
      return instance.post<TUser>('/users', payload);
    },
    update(id: number, payload: TPatchUser | FormData) {
      return instance.patch<TUser>(`/users/${id}`, payload);
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`/users/${id}`);
    }
  };
}
