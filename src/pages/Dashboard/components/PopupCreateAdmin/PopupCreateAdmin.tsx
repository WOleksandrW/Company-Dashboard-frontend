import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../../api';
import { toast } from 'react-toastify';
import { ModalUsage, TextFieldUsage } from '../../../../components';
import { EQueryKeys, ERole } from '../../../../types/enums';
import { schemaSignUp } from '../../../../types/schema';
import { TSignUpBody } from '../../../../types/types';

import { MdCancel, MdOutlineDone } from 'react-icons/md';

interface ICreateAdminForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function PopupCreateAdmin({ open, setOpen }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
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

  const { mutateAsync } = useMutation(
    (data: TSignUpBody) => api.users.create({ ...data, role: ERole.ADMIN }),
    {
      onSuccess: () => {
        toast.success('Admin created successfully!');
        queryClient.invalidateQueries(EQueryKeys.ADMINS_LIST);
      }
    }
  );

  const onSubmit = useCallback(
    async ({ username, email, password }: ICreateAdminForm) => {
      await mutateAsync({ username, email, password });
      setOpen(false);
    },
    [mutateAsync]
  );

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <ModalUsage open={open} setOpen={setOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
          Create admin
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
          sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Box
            sx={{
              width: 'min(300px, 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignSelf: 'center'
            }}>
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
                <TextFieldUsage label="Email" errorMessage={errors.email?.message} field={field} />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextFieldUsage
                  label="Password"
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
                  label="Confirm"
                  type="password"
                  autoComplete="off"
                  errorMessage={errors.confirm?.message}
                  field={field}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="button"
              startIcon={<MdCancel />}
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="submit"
              startIcon={<MdOutlineDone />}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalUsage>
  );
}

export default PopupCreateAdmin;
