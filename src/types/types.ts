import { EOrder } from '../enums/order.enum';
import { ERole } from '../enums/role.enum';
import { TUser } from './user.type';

type TGenetalGettAll = {
  limit?: number;
  page?: number;
  createdAt?: string;
  search?: string;
};

export type TGetAllCompanies = {
  user?: TUser['id'];
  titleOrder?: EOrder;
  serviceOrder?: EOrder;
  capitalMin?: number;
  capitalMax?: number;
} & TGenetalGettAll;

export type TGetAllUsers = {
  role?: ERole.USER | ERole.ADMIN;
} & TGenetalGettAll;

export type TGetAllResponse<T> = {
  list: T[];
  totalAmount: number;
  limit?: number;
  page?: number;
};

export type TSignInBody = {
  email: TUser['email'];
  password: string;
};

export type TSignUpBody = {
  username: TUser['username'];
} & TSignInBody;

export type TPatchUser = {
  oldPassword?: string;
  password?: string;
  username?: TUser['username'];
  email?: TUser['email'];
};
