import { AxiosInstance } from 'axios';
import { TUser } from '@root/types/user.type';
import { TGetAllResponse, TGetAllUsers, TPatchUser, TSignUpBody } from '@root/types/types';
import { ERole } from '@root/enums/role.enum';
import { EAxiosPaths } from '@root/enums/axiosPaths.enum';

export default function (instance: AxiosInstance) {
  return {
    getAll(queriesArray?: TGetAllUsers) {
      let queries = '';

      if (queriesArray) {
        queries =
          '?' +
          Object.entries(queriesArray)
            .filter((entry) => !!entry[1])
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
      }

      return instance.get<TGetAllResponse<TUser>>(EAxiosPaths.USERS + queries);
    },
    getMe() {
      return instance.get<TUser>(EAxiosPaths.CURRENT_USER);
    },
    getOne(id: number) {
      return instance.get<TUser>(`${EAxiosPaths.USERS}/${id}`);
    },
    create(payload: TSignUpBody & { role: ERole.USER | ERole.ADMIN }) {
      return instance.post<TUser>(EAxiosPaths.USERS, payload);
    },
    update(id: number, payload: TPatchUser | FormData) {
      return instance.patch<TUser>(`${EAxiosPaths.USERS}/${id}`, payload);
    },
    remove(id: number) {
      return instance.delete<{ message: string }>(`${EAxiosPaths.USERS}/${id}`);
    }
  };
}
