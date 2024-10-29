import { useCallback, useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { APIProviderContext, APIProviderContextValue } from '@vis.gl/react-google-maps';
import api from '@root/api';
import useQueryCurrentUser from '@root/hooks/useQueryCurrentUser';
import { FormModalUsage, GMapAutocomplete } from '../';
import { schemaCompany } from '@root/yup/schema';
import { EQueryKeys } from '@root/enums/queryKeys.enum';
import { TUser } from '@root/types/user.type';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  userId?: TUser['id'];
}

function PopupCreateCompany({ open, setOpen, userId }: IProps) {
  const { status: mapStatus } = useContext(APIProviderContext) as APIProviderContextValue;
  const queryClient = useQueryClient();
  const { data: userData } = useQueryCurrentUser();

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
    resolver: yupResolver(schemaCompany)
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

      if (userId) {
        formData.append('userId', userId.toString());
      }

      await mutateAsync(formData);
      setOpen(false);
    },
    [mutateAsync, userData, userId]
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
      control={control}
      inputs={[
        {
          controlName: 'title',
          label: 'Title',
          errorMessage: errors.title?.message
        },
        {
          controlName: 'service',
          label: 'Service',
          errorMessage: errors.service?.message
        },
        {
          controlName: 'address',
          label: 'Address',
          errorMessage: errors.address?.message,
          component: mapStatus === 'LOADED' ? GMapAutocomplete : undefined
        },
        {
          controlName: 'capital',
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
