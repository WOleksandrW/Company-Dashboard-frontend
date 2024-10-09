import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignUp } from '../../types/schema';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaSignUp)
  });

  const onSubmit = useCallback((data: FieldValues) => {
    console.log(data);
  }, []);

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
