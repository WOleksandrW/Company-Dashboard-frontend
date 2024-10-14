import { EOrder, ERole } from './enums';
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
  search?: string;
};

export type TGetAllUsers = {
  limit?: number;
  page?: number;
  createdAt?: string;
  role?: ERole.USER | ERole.ADMIN;
  search?: string;
};

export type TGetAllResponse<T> = {
  list: T[];
  totalAmount: number;
  limit?: number;
  page?: number;
};
