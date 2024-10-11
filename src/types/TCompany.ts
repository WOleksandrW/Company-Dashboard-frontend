import { TBaseDates } from './types';
import { TUser } from './TUser';
import { TImage } from './TImage';

export type TCompany = {
  id: number;
  title: string;
  service: string;
  address: string;
  capital: number;
  user: TUser;
  image: TImage | null;
} & TBaseDates;
