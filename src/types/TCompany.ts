import { TBaseDates } from './types';

export type TCompany = {
  id: number;
  title: string;
  service: string;
  address: string;
  capital: number;
} & TBaseDates;
