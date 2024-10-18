import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import api from '../../api';
import { AvatarUsage, FormModalUsage } from '../';
import { EQueryKeys } from '../../enums/queryKeys.enum';
import { schemaUpdateUser } from '../../types/schema';
import { TUser } from '../../types/TUser';
import { Box, Button } from '@mui/material';
import { MdCloudUpload } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import getImageFromBuffer from '../../utils/getImageFromBuffer';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: TUser;
  queryKey:
    | EQueryKeys.USERS_LIST
    | EQueryKeys.ADMINS_LIST
    | EQueryKeys.CURRENT_USER
    | EQueryKeys.USER;
  onSuccess?: () => void;
  toastMessage: string;
  popupTitle: string;
}

function PopupUpdateUser({
  open,
  setOpen,
  user,
  queryKey,
  onSuccess,
  toastMessage,
  popupTitle
}: IProps) {
  const { id, username, email, image } = user;
  const queryClient = useQueryClient();

  const [imgPreview, setImgPreview] = useState<string | null>(null);

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
      username,
      email
    },
    resolver: yupResolver(schemaUpdateUser)
  });

  const { mutateAsync } = useMutation((data: FormData) => api.users.update(id, data), {
    onSuccess: () => {
      toast.success(toastMessage);
      queryClient.invalidateQueries(queryKey);
      if (onSuccess) onSuccess();
    }
  });

  const watchFile = watch('file') as FileList | undefined | null;

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
      setOpen(false);
    },
    [mutateAsync]
  );

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

  const srcImage = useMemo(() => {
    if (image) return getImageFromBuffer(image.data.data, image.mimeType);
  }, [image]);

  useEffect(() => {
    handleImagePreview();
  }, [watchFile]);

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  return (
    <FormModalUsage
      open={open}
      setOpen={setOpen}
      title={popupTitle}
      inputs={[
        {
          controlParams: { control, name: 'username' },
          label: 'Username',
          errorMessage: errors.username?.message
        },
        {
          controlParams: { control, name: 'email' },
          label: 'Email',
          errorMessage: errors.email?.message
        }
      ]}
      submitHandler={(e) => {
        handleSubmit(onSubmit)(e);
      }}
      startChildren={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
          <AvatarUsage
            src={imgPreview ?? (watchFile !== null ? srcImage : undefined)}
            title={username}
            sx={{
              height: '120px',
              width: '120px',
              fontSize: '10rem'
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
      }
    />
  );
}

export default PopupUpdateUser;
