import { useEffect } from 'react';
import useQueryCurrUser from '../hooks/useQueryCurrUser';

interface IProps {
  setIsLoading: (value: boolean) => void;
}

function AuthController({ setIsLoading }: IProps) {
  const { refetch } = useQueryCurrUser();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('accessToken')) {
        await refetch();
      }
      setIsLoading(false);
    })();
  }, []);

  return undefined;
}

export default AuthController;
