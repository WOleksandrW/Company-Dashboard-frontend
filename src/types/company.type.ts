import { TBaseDates } from './base.type';
import { TUser } from './user.type';
import { TImage } from './image.type';

export type TCompany = {
  id: number;
  title: string;
  service: string;
  address: string;
  capital: number;
  user: TUser;
  image: TImage | null;
} & TBaseDates;
