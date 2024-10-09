import { ERole } from './enums';

export type TUser = {
  id: number;
  username: string;
  email: string;
  role: ERole;
};
