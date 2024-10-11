import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignIn } from '../../types/schema';
import { TSignInBody } from '../../types/types';
import useQueryCurrUser from '../../hooks/useQueryCurrUser';

function SignIn() {
  const navigate = useNavigate();

  const { refetch } = useQueryCurrUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
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
      <h2 className="h2 primary-color">Sign in</h2>
      <AuthForm
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        submitText="Sign in"
        inputs={[
          {
            id: 'input-email',
            label: 'Email:',
            type: 'email',
            placeholder: 'example@gmail.com',
            register: register('email'),
            error: errors.email?.message
          },
          {
            id: 'input-password',
            label: 'Password:',
            type: 'password',
            register: register('password'),
            error: errors.password?.message
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
