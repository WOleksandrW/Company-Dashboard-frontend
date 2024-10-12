import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import useQueryCurrUser from '../../../../hooks/useQueryCurrUser';
import { ModalUsage, TextFieldUsage } from '../../../../components';
import { schemaUpdateCompany } from '../../../../types/schema';
import { EQueryKeys } from '../../../../types/enums';

import { MdCancel, MdOutlineDone } from 'react-icons/md';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function PopupCreateCompany({ open, setOpen }: IProps) {
  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      service: '',
      address: '',
      capital: 0
    },
    resolver: yupResolver(schemaUpdateCompany)
  });

  const { mutateAsync } = useMutation((data: FormData) => api.companies.create(data), {
    onSuccess: () => {
      toast.success('Company created successfully!');
      queryClient.invalidateQueries(EQueryKeys.COMPANIES_LIST);
    }
  });

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      if (!userData) return;

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('userId', userData.id.toString());

      await mutateAsync(formData);
      setOpen(false);
    },
    [mutateAsync, userData]
  );

  useEffect(() => {
    if (!userData) setOpen(false);
  }, [userData]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <ModalUsage open={open} setOpen={setOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
          Create company
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
              name="title"
              control={control}
              render={({ field }) => (
                <TextFieldUsage label="Title" errorMessage={errors.title?.message} field={field} />
              )}
            />
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <TextFieldUsage
                  label="Service"
                  errorMessage={errors.service?.message}
                  field={field}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextFieldUsage
                  label="Address"
                  errorMessage={errors.address?.message}
                  field={field}
                />
              )}
            />
            <Controller
              name="capital"
              control={control}
              render={({ field }) => (
                <TextFieldUsage
                  label="Capital"
                  type="number"
                  errorMessage={errors.capital?.message}
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

export default PopupCreateCompany;
