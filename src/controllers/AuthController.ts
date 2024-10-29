import { useEffect } from 'react';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';

interface IProps {
  setIsLoading: (value: boolean) => void;
}

function AuthController({ setIsLoading }: IProps) {
  const { refetch } = useQueryCurrentUser();

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
