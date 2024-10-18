import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import getImageFromBuffer from '../../../../utils/getImageFromBuffer';
import api from '../../../../api';
import { ImageBlock, TextFieldUsage } from '../../../../components';
import { TCompany } from '../../../../types/company.type';
import { schemaCompany } from '../../../../yup/schema';
import { EQueryKeys } from '../../../../enums/queryKeys.enum';

import { FaTrashAlt } from 'react-icons/fa';
import { MdCancel, MdCloudUpload, MdOutlineDone } from 'react-icons/md';

interface IProps {
  company: TCompany;
  onClose: () => void;
}

function UpdateCompanyForm({ company, onClose }: IProps) {
  const { id, image, title, service, address, capital } = company;
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: title,
      service: service,
      address: address,
      capital: capital
    },
    resolver: yupResolver(schemaCompany)
  });

  const { mutateAsync } = useMutation((data: FormData) => api.companies.update(id, data), {
    onSuccess: (data) => {
      toast.success('Company updated successfully!');
      queryClient.setQueryData([EQueryKeys.COMPANY, { id }], data);
    }
  });

  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const watchFile = watch('file') as FileList | undefined;

  const handleImagePreview = () => {
    const file = watchFile?.[0];
    if (file instanceof File && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  const imgSrc = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);

  const onSubmit = useCallback(
    async ({ file, ...restData }: FieldValues) => {
      const formData = new FormData();
      Object.entries(restData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (file?.[0]) {
        if ((file[0] as File).type.startsWith('image/')) {
          formData.append('file', file[0]);
        }
      } else if (file === null) {
        formData.append('file', file);
      }

      await mutateAsync(formData);
      onClose();
    },
    [mutateAsync, reset]
  );

  useEffect(() => {
    handleImagePreview();
  }, [watchFile]);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        handleSubmit(onSubmit)(e);
      }}
      sx={{ width: 'min(800px, 100%)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '32px',
          '@media (max-width: 640px)': {
            flexDirection: 'column',
            gap: '20px'
          }
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <ImageBlock
            imgSrc={imgPreview ?? (watchFile !== null ? imgSrc : undefined)}
            altText={title}
            sx={{
              height: '300px',
              width: 'min(300px, 100%)',
              '@media (max-width: 768px)': {
                maxHeight: '240px',
                maxWidth: '240px'
              },
              '@media (max-width: 640px)': {
                maxHeight: '280px',
                maxWidth: '280px'
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button
              sx={{ typography: 'body1' }}
              component="label"
              variant="outlined"
              startIcon={<MdCloudUpload />}>
              Upload
              <input
                type="file"
                accept="image/*"
                {...register('file')}
                style={{ display: 'none' }}
              />
            </Button>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              startIcon={<FaTrashAlt />}
              onClick={() => setValue('file', null)}
              disabled={watchFile === null || (!watchFile && !image)}>
              Remove
            </Button>
          </Box>
        </Box>
        <Box
          sx={{ width: 'min(400px, 100%)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <Button
          sx={{ typography: 'body1' }}
          variant="outlined"
          type="button"
          startIcon={<MdCancel />}
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          sx={{ typography: 'body1' }}
          variant="outlined"
          type="submit"
          startIcon={<MdOutlineDone />}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateCompanyForm;
