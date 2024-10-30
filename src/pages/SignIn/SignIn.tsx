import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '@root/api';
import { Typography } from '@mui/material';
import { AuthForm, TextLinkList } from '@root/components';
import { schemaSignIn } from '@root/yup/schema';
import { TSignInBody } from '@root/types/types';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';
import { ERouterPaths } from '@root/enums/routerPaths.enum';
import { ELocalStorageKeys } from '@root/enums/localStorageKeys.enum';

function SignIn() {
  const navigate = useNavigate();

  const { refetch } = useQueryCurrentUser();

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
      localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(ELocalStorageKeys.REFRESH_TOKEN, data.refresh_token);
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
      <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
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
          {
            text: 'Did you forget your password?',
            lintText: 'Reset password',
            linkTo: ERouterPaths.RESET
          },
          {
            text: 'Don`t have an account yet?',
            lintText: 'Sign up',
            linkTo: ERouterPaths.SIGNUP
          }
        ]}
      />
    </>
  );
}

export default SignIn;
