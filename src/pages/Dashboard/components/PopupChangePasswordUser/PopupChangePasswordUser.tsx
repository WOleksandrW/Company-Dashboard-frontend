import { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { FormModalUsage } from '../../../../components';
import { schemaChangePassword } from '../../../../types/schema';
import { TPatchUser } from '../../../../types/types';
import { TUser } from '../../../../types/TUser';

interface IFormValues {
  password: string;
  confirm: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId: TUser['id'];
  toastMessage: string;
}

function PopupChangePasswordUser({ open, setOpen, userId, toastMessage }: IProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirm: ''
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

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <FormModalUsage
      open={open}
      setOpen={setOpen}
      title="Change password"
      inputs={[
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
