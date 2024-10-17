import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../../api';
import { toast } from 'react-toastify';
import { FormModalUsage } from '../../../../components';
import { EQueryKeys, ERole } from '../../../../types/enums';
import { schemaSignUp } from '../../../../types/schema';
import { TSignUpBody } from '../../../../types/types';

interface ICreateAdminForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function PopupCreateAdmin({ open, setOpen }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm: ''
    },
    resolver: yupResolver(schemaSignUp)
  });

  const { mutateAsync } = useMutation(
    (data: TSignUpBody) => api.users.create({ ...data, role: ERole.ADMIN }),
    {
      onSuccess: () => {
        toast.success('Admin created successfully!');
        queryClient.invalidateQueries(EQueryKeys.ADMINS_LIST);
      }
    }
  );

  const onSubmit = useCallback(
    async ({ username, email, password }: ICreateAdminForm) => {
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
      title="Create Admin"
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

export default PopupCreateAdmin;
