import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import { schemaUpdateUserPassword } from '../../../../types/schema';
import { TPatchUser } from '../../../../types/types';
import { TUser } from '../../../../types/TUser';

import { MdOutlineDone } from 'react-icons/md';
import { TextFieldUsage } from '../../../../components';

interface IUpdatePasswordForm {
  oldPassword: string;
  password: string;
  confirm: string;
}

interface IProps {
  id: TUser['id'];
}

function UpdateUserPasswordForm({ id }: IProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      oldPassword: '',
      password: '',
      confirm: ''
    },
    resolver: yupResolver(schemaUpdateUserPassword)
  });

  const { mutateAsync } = useMutation((data: TPatchUser) => api.users.update(id, data), {
    onSuccess: () => {
      toast.success('Password changed successfully!');
    }
  });

  const onSubmit = useCallback(
    async ({ password, oldPassword }: IUpdatePasswordForm) => {
      await mutateAsync({ oldPassword, password });
      reset();
    },
    [reset]
  );

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
      sx={{
        margin: '0 auto',
        width: 'min(300px, 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field }) => (
            <TextFieldUsage
              label="Old password"
              type="password"
              autoComplete="off"
              errorMessage={errors.oldPassword?.message}
              field={field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextFieldUsage
              label="New password"
              type="password"
              autoComplete="off"
              errorMessage={errors.password?.message}
              field={field}
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <TextFieldUsage
              label="Confirm new password"
              type="password"
              autoComplete="off"
              errorMessage={errors.confirm?.message}
              field={field}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ typography: 'body1' }}
          variant="outlined"
          type="submit"
          startIcon={<MdOutlineDone />}>
          Change
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateUserPasswordForm;
