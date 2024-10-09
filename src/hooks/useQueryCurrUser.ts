import { useQuery } from 'react-query';
import api from '../api';
import { EQueryKeys } from '../types/enums';

function useQueryCurrUser() {
  const { data, refetch } = useQuery(EQueryKeys.CURRENT_USER, () => api.users.getMe(), {
    select: ({ data }) => data,
    enabled: false
  });

  return { data, refetch };
}

export default useQueryCurrUser;
