import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { ConfirmModalUsage } from '../../../../components';
import { EQueryKeys } from '../../../../types/enums';
import { TUser } from '../../../../types/TUser';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: TUser;
}

function PopupDeleteAdmin({ user, ...rest }: IProps) {
  const { id, username } = user;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => api.users.remove(id), {
    onSuccess: () => {
      toast.success(`Admin "${username}" deleted successfully!`);
      queryClient.invalidateQueries(EQueryKeys.ADMINS_LIST);
    }
  });

  return (
    <ConfirmModalUsage
      {...rest}
      title="Confirm deletion"
      text={`Are you sure you want to delete the admin "${username}"`}
      onSubmit={() => mutate()}
    />
  );
}

export default PopupDeleteAdmin;
