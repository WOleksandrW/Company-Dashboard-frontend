import { ERole } from '../enums/role.enum';
import { TBaseDates } from './base.type';
import { TImage } from './image.type';

export type TUser = {
  id: number;
  username: string;
  email: string;
  role: ERole;
  image: TImage | null;
} & TBaseDates;
