import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignIn } from '../../types/schema';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaSignIn)
  });

  const onSubmit = useCallback((data: FieldValues) => {
    console.log(data);
  }, []);

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
