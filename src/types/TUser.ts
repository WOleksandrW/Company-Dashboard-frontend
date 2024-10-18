import { ERole } from '../enums/role.enum';
import { TBaseDates } from './types';
import { TImage } from './TImage';

export type TUser = {
  id: number;
  username: string;
  email: string;
  role: ERole;
  image: TImage | null;
} & TBaseDates;
