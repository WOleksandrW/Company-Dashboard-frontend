import { useCallback } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { emailRegexp, passwordRegexp } from '../../constants/regexps';
import { AuthForm, TextLinkList } from '../../components';

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

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
            register: register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegexp,
                message: 'Invalid email address'
              }
            }),
            error: errors.email?.message as string
          },
          {
            id: 'input-password',
            label: 'Password:',
            type: 'password',
            register: register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              },
              maxLength: {
                value: 20,
                message: 'Password must be less than 20 characters'
              },
              pattern: {
                value: passwordRegexp,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              }
            }),
            error: errors.password?.message as string
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
