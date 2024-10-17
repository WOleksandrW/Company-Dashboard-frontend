import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { FormModalUsage } from '../';
import { EQueryKeys } from '../../types/enums';
import { schemaUpdateUser } from '../../types/schema';
import { TPatchUser } from '../../types/types';
import { TUser } from '../../types/TUser';

interface IFormValues {
  username: string;
  email: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: TUser;
  queryKey: EQueryKeys.USERS_LIST | EQueryKeys.ADMINS_LIST | EQueryKeys.CURRENT_USER;
  onSuccess?: () => void;
  toastMessage: string;
  popupTitle: string;
}

function PopupUpdateUser({
  open,
  setOpen,
  user,
  queryKey,
  onSuccess,
  toastMessage,
  popupTitle
}: IProps) {
  const { id, username, email } = user;
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username,
      email
    },
    resolver: yupResolver(schemaUpdateUser)
  });

  const { mutateAsync } = useMutation((data: TPatchUser) => api.users.update(id, data), {
    onSuccess: () => {
      toast.success(toastMessage);
      queryClient.invalidateQueries(queryKey);
      if (onSuccess) onSuccess();
    }
  });

  const onSubmit = useCallback(
    async ({ username, email }: IFormValues) => {
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
      title={popupTitle}
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

export default PopupUpdateUser;
