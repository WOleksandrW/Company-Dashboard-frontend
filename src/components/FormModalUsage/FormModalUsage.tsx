/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { ModalUsage, TextFieldUsage } from '..';
import { Box, Button, Typography } from '@mui/material';
import { MdCancel, MdOutlineDone } from 'react-icons/md';
import { Control, Controller } from 'react-hook-form';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  title: string;
  startChildren?: React.ReactNode;
  control: Control<any>;
  inputs: {
    controlName: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    autoComplete?: string;
  }[];
}

function FormModalUsage({
  open,
  setOpen,
  title,
  control,
  inputs,
  onCancel,
  submitHandler,
  startChildren
}: IProps) {
  const cancelHandler = useCallback(() => {
    if (onCancel) onCancel();
    setOpen(false);
  }, [onCancel]);

  return (
    <ModalUsage open={open} setOpen={setOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => submitHandler(e)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Box
            sx={{
              width: 'min(300px, 100%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignSelf: 'center'
            }}>
            {startChildren}
            {inputs.map(({ controlName, ...rest }) => (
              <Controller
                key={controlName}
                name={controlName}
                control={control}
                render={({ field }) => <TextFieldUsage {...rest} field={field} />}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="button"
              color="error"
              startIcon={<MdCancel />}
              onClick={cancelHandler}>
              Cancel
            </Button>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="submit"
              color="success"
              startIcon={<MdOutlineDone />}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalUsage>
  );
}

export default FormModalUsage;
