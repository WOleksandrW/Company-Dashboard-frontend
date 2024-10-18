import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import api from '@root/api';
import { ConfirmModalUsage } from '@root/components';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { TUser } from '@root/types/user.type';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: TUser['id'];
  queryKey: EQueryKeys.USERS_LIST | EQueryKeys.ADMINS_LIST;
  toastMessage: string;
  popupText: string;
}

function PopupDeleteUser({ userId, queryKey, toastMessage, popupText, ...rest }: IProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => api.users.remove(userId), {
    onSuccess: () => {
      toast.success(toastMessage);
      queryClient.invalidateQueries(queryKey);
    }
  });

  return (
    <ConfirmModalUsage
      {...rest}
      title="Confirm deletion"
      text={popupText}
      onSubmit={() => mutate()}
    />
  );
}

export default PopupDeleteUser;
