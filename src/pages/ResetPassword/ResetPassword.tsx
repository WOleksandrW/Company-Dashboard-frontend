import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../api';
import { AuthForm, TextLinkList } from '../../components';
import { schemaResetPassword } from '../../types/schema';
import { TSignInBody } from '../../types/types';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaResetPassword)
  });

  const { mutateAsync } = useMutation((data: TSignInBody) => api.auth.resetPassword(data), {
    onSuccess: (data) => {
      console.log(data);
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
      <h2 className="h2 primary-color">Reset Password</h2>
      <AuthForm
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        submitText="Reset"
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
          },
          {
            id: 'input-confirm',
            label: 'Confirm password:',
            type: 'password',
            register: register('confirm'),
            error: errors.confirm?.message
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
