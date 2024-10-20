import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '@root/api';
import { toast } from 'react-toastify';
import { FormModalUsage } from '@root/components';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { ERole } from '@root/enums/role.enum';
import { schemaSignUp } from '@root/yup/schema';
import { TSignUpBody } from '@root/types/types';

interface IFormValues {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  queryKey: EQueryKeys.USERS_LIST | EQueryKeys.ADMINS_LIST;
  role: ERole.USER | ERole.ADMIN;
  toastMessage: string;
  popupTitle: string;
}

function PopupCreateUser({ open, setOpen, queryKey, role, toastMessage, popupTitle }: IProps) {
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

  const { mutateAsync } = useMutation((data: TSignUpBody) => api.users.create({ ...data, role }), {
    onSuccess: () => {
      toast.success(toastMessage);
      queryClient.invalidateQueries(queryKey);
    }
  });

  const onSubmit = useCallback(
    async ({ username, email, password }: IFormValues) => {
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
      title={popupTitle}
      control={control}
      inputs={[
        {
          controlName: 'username',
          label: 'Username',
          errorMessage: errors.username?.message
        },
        {
          controlName: 'email',
          label: 'Email',
          errorMessage: errors.email?.message
        },
        {
          controlName: 'password',
          label: 'Password',
          type: 'password',
          autoComplete: 'off',
          errorMessage: errors.password?.message
        },
        {
          controlName: 'confirm',
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

export default PopupCreateUser;
