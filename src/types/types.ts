import { EOrder } from './enums';
import { TUser } from './TUser';

export type TBaseDates = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TSignInBody = {
  email: TUser['email'];
  password: string;
};

export type TSignUpBody = {
  username: TUser['username'];
} & TSignInBody;

export type TGetAllCompanies = {
  titleOrder?: EOrder;
  serviceOrder?: EOrder;
  limit?: number;
  page?: number;
  createdAt?: string;
  capitalMin?: number;
  capitalMax?: number;
};
