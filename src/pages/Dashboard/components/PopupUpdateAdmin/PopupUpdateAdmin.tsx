import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { FormModalUsage } from '../../../../components';
import { EQueryKeys } from '../../../../types/enums';
import { schemaSignUp } from '../../../../types/schema';
import { TSignUpBody } from '../../../../types/types';
import { TUser } from '../../../../types/TUser';

interface IUpdateAdminForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
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
      email: user.email,
      password: '',
      confirm: ''
    },
    resolver: yupResolver(schemaSignUp)
  });

  const { mutateAsync } = useMutation((data: TSignUpBody) => api.users.update(user.id, data), {
    onSuccess: () => {
      toast.success('Admin updated successfully!');
      queryClient.invalidateQueries(EQueryKeys.ADMINS_LIST);
    }
  });

  const onSubmit = useCallback(
    async ({ username, email, password }: IUpdateAdminForm) => {
      await mutateAsync({ username, email, password });
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
        },
        {
          controlParams: { control, name: 'password' },
          label: 'Password',
          type: 'password',
          autoComplete: 'off',
          errorMessage: errors.password?.message
        },
        {
          controlParams: { control, name: 'confirm' },
          label: 'Confirm password',
          type: 'password',
          autoComplete: 'off',
          errorMessage: errors.confirm?.message
        }
      ]}
      submitHandler={(e) => {
        handleSubmit(onSubmit)(e);
      }}
    />
  );
}

export default PopupUpdateAdmin;
