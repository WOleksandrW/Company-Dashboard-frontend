import { TUser } from './TUser';

export type TSignInBody = {
  email: TUser['email'];
  password: string;
};

export type TSignUpBody = {
  username: TUser['username'];
} & TSignInBody;
