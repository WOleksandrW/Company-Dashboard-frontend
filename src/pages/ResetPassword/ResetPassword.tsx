import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '@root/api';
import { Typography } from '@mui/material';
import { AuthForm, TextLinkList } from '@root/components';
import { schemaResetPassword } from '@root/yup/schema';
import { TSignInBody } from '@root/types/types';

function ResetPassword() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm: ''
    },
    resolver: yupResolver(schemaResetPassword)
  });

  const { mutateAsync } = useMutation((data: TSignInBody) => api.auth.resetPassword(data), {
    onSuccess: () => {
      toast.success('Password reset successfully!');
      navigate('/sign-in');
    }
  });

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      await mutateAsync(data as TSignInBody);
      reset();
    },
    [mutateAsync, reset]
  );

  return (
    <>
      <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
        Reset password
      </Typography>
      <AuthForm
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        submitText="Reset"
        control={control}
        inputs={[
          {
            controlName: 'email',
            label: 'Email',
            type: 'email',
            errorMessage: errors.email?.message
          },
          {
            controlName: 'password',
            label: 'Password',
            type: 'password',
            errorMessage: errors.password?.message,
            autoComplete: 'off'
          },
          {
            controlName: 'confirm',
            label: 'Confirm password',
            type: 'password',
            errorMessage: errors.confirm?.message,
            autoComplete: 'off'
          }
        ]}
      />
      <TextLinkList
        list={[{ text: 'Did you remember your password?', lintText: 'Login', linkTo: '/sign-in' }]}
      />
    </>
  );
}

export default ResetPassword;
