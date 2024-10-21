import { useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ModalUsage } from '../';

import { MdCancel, MdOutlineDone } from 'react-icons/md';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  text: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}

function ConfirmModalUsage({ open, setOpen, title, text, onSubmit, onCancel }: IProps) {
  const cancelHandler = useCallback(() => {
    if (onCancel) onCancel();
    setOpen(false);
  }, [onCancel]);

  const submitHandler = useCallback(() => {
    if (onSubmit) onSubmit();
    setOpen(false);
  }, [onSubmit]);

  return (
    <ModalUsage open={open} setOpen={setOpen}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1">{text}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{ typography: 'body1' }}
            variant="outlined"
            color="error"
            startIcon={<MdCancel />}
            onClick={cancelHandler}>
            Cancel
          </Button>
          <Button
            sx={{ typography: 'body1' }}
            variant="outlined"
            color="success"
            startIcon={<MdOutlineDone />}
            onClick={submitHandler}>
            Confirm
          </Button>
        </Box>
      </Box>
    </ModalUsage>
  );
}

export default ConfirmModalUsage;
