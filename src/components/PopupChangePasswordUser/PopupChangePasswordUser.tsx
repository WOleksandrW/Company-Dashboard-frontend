import { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '@root/api';
import { FormModalUsage } from '../';
import { schemaChangePassword } from '@root/yup/schema';
import { TPatchUser } from '@root/types/types';
import { TUser } from '@root/types/user.type';

interface IFormValues {
  password: string;
  confirm: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: TUser['id'];
  toastMessage: string;
  hasOldPassword?: boolean;
}

function PopupChangePasswordUser({ open, setOpen, userId, toastMessage, hasOldPassword }: IProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirm: '',
      oldPassword: hasOldPassword ? '' : undefined
    },
    resolver: yupResolver(schemaChangePassword)
  });

  const { mutateAsync } = useMutation((data: TPatchUser) => api.users.update(userId, data), {
    onSuccess: () => {
      toast.success(toastMessage);
    }
  });

  const onSubmit = useCallback(
    async ({ password }: IFormValues) => {
      await mutateAsync({ password });
      setOpen(false);
    },
    [mutateAsync]
  );

  const additionalInputs = useMemo(
    () =>
      hasOldPassword
        ? [
            {
              controlParams: { control, name: 'oldPassword' },
              label: 'Old password',
              type: 'password',
              autoComplete: 'off',
              errorMessage: errors.oldPassword?.message
            }
          ]
        : [],
    [hasOldPassword, control, errors.oldPassword]
  );

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <FormModalUsage
      open={open}
      setOpen={setOpen}
      title="Change password"
      inputs={[
        ...additionalInputs,
        {
          controlParams: { control, name: 'password' },
          label: 'New password',
          type: 'password',
          autoComplete: 'off',
          errorMessage: errors.password?.message
        },
        {
          controlParams: { control, name: 'confirm' },
          label: 'Confirm new password',
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

export default PopupChangePasswordUser;
