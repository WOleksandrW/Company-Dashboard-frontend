import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { FormModalUsage } from '../../../../components';
import { EQueryKeys } from '../../../../types/enums';
import { schemaUpdateUser } from '../../../../types/schema';
import { TPatchUser } from '../../../../types/types';
import { TUser } from '../../../../types/TUser';

interface IUpdateAdminForm {
  username: string;
  email: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: TUser;
}

function PopupUpdateAdmin({ open, setOpen, user }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email
    },
    resolver: yupResolver(schemaUpdateUser)
  });

  const { mutateAsync } = useMutation((data: TPatchUser) => api.users.update(user.id, data), {
    onSuccess: () => {
      toast.success('Admin updated successfully!');
      queryClient.invalidateQueries(EQueryKeys.ADMINS_LIST);
    }
  });

  const onSubmit = useCallback(
    async ({ username, email }: IUpdateAdminForm) => {
      await mutateAsync({ username, email });
      setOpen(false);
    },
    [mutateAsync]
  );

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <FormModalUsage
      open={open}
      setOpen={setOpen}
      title="Update Admin"
      inputs={[
        {
          controlParams: { control, name: 'username' },
          label: 'Username',
          errorMessage: errors.username?.message
        },
        {
          controlParams: { control, name: 'email' },
          label: 'Email',
          errorMessage: errors.email?.message
        }
      ]}
      submitHandler={(e) => {
        handleSubmit(onSubmit)(e);
      }}
    />
  );
}

export default PopupUpdateAdmin;
