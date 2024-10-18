import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { Typography } from '@mui/material';
import { AuthForm, TextLinkList } from '../../components';
import { schemaSignUp } from '../../yup/schema';
import { TSignUpBody } from '../../types/types';

function SignUp() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
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
      <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
        Sign up
      </Typography>
      <AuthForm
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
        submitText="Sign up"
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
        list={[{ text: 'Already have an account?', lintText: 'Login', linkTo: '/sign-in' }]}
      />
    </>
  );
}

export default SignUp;
