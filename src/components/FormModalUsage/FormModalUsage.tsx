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
  inputs: {
    controlParams: {
      control: Control<any>;
      name: string;
    };
    label: string;
    type?: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    autoComplete?: string;
  }[];
}

function FormModalUsage({ open, setOpen, title, inputs, onCancel, submitHandler }: IProps) {
  const cancelHandler = useCallback(() => {
    if (onCancel) onCancel();
    setOpen(false);
  }, [onCancel]);

  return (
    <ModalUsage open={open} setOpen={setOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h2" className="primary-color" sx={{ fontWeight: 'bold' }}>
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
            {inputs.map(({ controlParams, ...rest }) => (
              <Controller
                key={controlParams.name}
                name={controlParams.name}
                control={controlParams.control}
                render={({ field }) => <TextFieldUsage {...rest} field={field} />}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="button"
              startIcon={<MdCancel />}
              onClick={cancelHandler}>
              Cancel
            </Button>
            <Button
              sx={{ typography: 'body1' }}
              variant="outlined"
              type="submit"
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
