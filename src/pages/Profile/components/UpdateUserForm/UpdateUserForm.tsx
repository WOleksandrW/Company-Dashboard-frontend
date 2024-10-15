import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Box, Button } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import useQueryCurrUser from '../../../../hooks/useQueryCurrUser';
import { TextFieldUsage } from '../../../../components';
import { schemaUpdateUser } from '../../../../types/schema';
import { TPatchUser } from '../../../../types/types';
import { TUser } from '../../../../types/TUser';

import { MdOutlineDone } from 'react-icons/md';

interface IProps {
  id: TUser['id'];
  username: TUser['username'];
  email: TUser['email'];
}

function UpdateUserForm({ id, username, email }: IProps) {
  const { refetch } = useQueryCurrUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username,
      email
    },
    resolver: yupResolver(schemaUpdateUser)
  });

  const { mutateAsync } = useMutation((data: TPatchUser) => api.users.update(id, data), {
    onSuccess: () => {
      toast.success('User data changed successfully!');
      refetch();
    }
  });

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      await mutateAsync(data);
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
          name="username"
          control={control}
          render={({ field }) => (
            <TextFieldUsage
              label="Username"
              errorMessage={errors.username?.message}
              field={field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextFieldUsage
              label="Email"
              type="email"
              errorMessage={errors.email?.message}
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

export default UpdateUserForm;
