import { AxiosInstance } from 'axios';
import { TUser } from '@root/types/user.type';
import { TSignInBody, TSignUpBody } from '@root/types/types';
import { EAxiosPaths } from '@root/enums/axiosPaths.enum';

type TLoginResponse = {
  access_token: string;
  refresh_token: string;
};

export default function (instance: AxiosInstance) {
  return {
    login(payload: TSignInBody) {
      return instance.post<TLoginResponse>(EAxiosPaths.LOGIN, payload);
    },
    signUp(payload: TSignUpBody) {
      return instance.post<TUser>(EAxiosPaths.SIGNUP, payload);
    },
    resetPassword(payload: TSignInBody) {
      return instance.post(EAxiosPaths.RESET_PASSWORD, payload);
    }
  };
}
