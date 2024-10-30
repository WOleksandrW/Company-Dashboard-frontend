import { useEffect } from 'react';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';
import { ELocalStorageKeys } from '@root/enums/localStorageKeys.enum';

interface IProps {
  setIsLoading: (value: boolean) => void;
}

function AuthController({ setIsLoading }: IProps) {
  const { refetch } = useQueryCurrentUser();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem(ELocalStorageKeys.ACCESS_TOKEN)) {
        await refetch();
      }
      setIsLoading(false);
    })();
  }, []);

  return undefined;
}

export default AuthController;
