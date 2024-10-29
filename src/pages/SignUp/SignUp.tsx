import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '@root/api';
import { Typography } from '@mui/material';
import { AuthForm, TextLinkList } from '@root/components';
import { schemaSignUp } from '@root/yup/schema';
import { TSignUpBody } from '@root/types/types';
import { ERouterPaths } from '@root/enums/routerPaths.enum';

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
      navigate(ERouterPaths.SIGNIN);
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
      <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
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
        list={[
          {
            text: 'Already have an account?',
            lintText: 'Login',
            linkTo: ERouterPaths.SIGNIN
          }
        ]}
      />
    </>
  );
}

export default SignUp;
