import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

interface IAxiosErrorResponse {
  message?: string;
}

export const onAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;
    const errorMessage = (axiosError.response?.data.message as string) || 'An error occurred';
    toast.error(`Error ${axiosError.status}: ${errorMessage}`);
  } else {
    toast.error('An unexpected error occurred.');
  }
};
