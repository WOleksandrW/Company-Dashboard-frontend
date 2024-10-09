import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignUp } from '../../types/schema';
import { TSignUpBody } from '../../types/types';

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaSignUp)
  });

  const { mutateAsync } = useMutation((data: TSignUpBody) => api.auth.signUp(data), {
    onSuccess: () => {
      toast.success('Account created successfully!');
      navigate('/sign-in');
    }
  });

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      await mutateAsync(data as TSignUpBody);
      reset();
    },
    [mutateAsync, reset]
  );

  return (
    <>
      <h2 className="h2 primary-color">Sign up</h2>
      <AuthForm
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        submitText="Sign up"
        inputs={[
          {
            id: 'input-username',
            label: 'Username:',
            register: register('username'),
            error: errors.username?.message
          },
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
        list={[{ text: 'Already have an account?', lintText: 'Login', linkTo: '/sign-in' }]}
      />
    </>
  );
}

export default SignUp;
