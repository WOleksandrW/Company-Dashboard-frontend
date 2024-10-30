import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { EAxiosPaths } from '@root/enums/axiosPaths.enum';
import { ELocalStorageKeys } from '@root/enums/localStorageKeys.enum';

interface IAxiosErrorResponse {
  message?: string;
}

export const onAxiosError = (error: unknown, queryClient: QueryClient) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;
    const errorMessage = (axiosError.response?.data.message as string) || 'An error occurred';

    if (axiosError.status === 404 && axiosError.config?.url === EAxiosPaths.REFRESH_TOKEN) {
      localStorage.removeItem(ELocalStorageKeys.ACCESS_TOKEN);
      localStorage.removeItem(ELocalStorageKeys.REFRESH_TOKEN);
      queryClient.resetQueries(EQueryKeys.CURRENT_USER);
    }

    toast.error(`Error ${axiosError.status}: ${errorMessage}`);
  } else {
    toast.error('An unexpected error occurred.');
  }
};
