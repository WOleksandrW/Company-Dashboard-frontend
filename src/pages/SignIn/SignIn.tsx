import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { Typography } from '@mui/material';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignIn } from '../../types/schema';
import { TSignInBody } from '../../types/types';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';

function SignIn() {
  const navigate = useNavigate();

  const { refetch } = useQueryCurrUser();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schemaSignIn)
  });

  const { mutateAsync } = useMutation((data: TSignInBody) => api.auth.login(data), {
    onSuccess: async ({ data }) => {
      toast.success('Logged in successfully!');
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      await refetch();
      navigate('/');
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
      <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
        Sign in
      </Typography>
      <AuthForm
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        submitText="Sign in"
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
          }
        ]}
      />
      <TextLinkList
        list={[
          { text: 'Did you forget your password?', lintText: 'Reset password', linkTo: '/reset' },
          { text: 'Don`t have an account yet?', lintText: 'Sign up', linkTo: '/sign-up' }
        ]}
      />
    </>
  );
}

export default SignIn;
