import { ERole } from './enums';
import { TBaseDates } from './types';

export type TUser = {
  id: number;
  username: string;
  email: string;
  role: ERole;
} & TBaseDates;
