import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../../../api';
import useQueryCurrUser from '../../../../hooks/useQueryCurrUser';
import { FormModalUsage } from '../../../../components';
import { schemaUpdateCompany } from '../../../../types/schema';
import { EQueryKeys } from '../../../../types/enums';

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
    <FormModalUsage
      open={open}
      setOpen={setOpen}
      title="Create Company"
      inputs={[
        {
          controlParams: { control, name: 'title' },
          label: 'Title',
          errorMessage: errors.title?.message
        },
        {
          controlParams: { control, name: 'service' },
          label: 'Service',
          errorMessage: errors.service?.message
        },
        {
          controlParams: { control, name: 'address' },
          label: 'Address',
          errorMessage: errors.address?.message
        },
        {
          controlParams: { control, name: 'capital' },
          label: 'Capital',
          type: 'number',
          errorMessage: errors.capital?.message
        }
      ]}
      submitHandler={(e) => {
        handleSubmit(onSubmit)(e);
      }}
    />
  );
}

export default PopupCreateCompany;
