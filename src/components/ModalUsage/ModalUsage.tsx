import React from 'react';
import { Modal, IconButton, Box } from '@mui/material';

import { MdClose } from 'react-icons/md';

import styles from './ModalUsage.module.scss';

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
}

function ModalUsage({ open, setOpen, children }: IProps) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box className={styles['popup']}>
        <IconButton className={styles['close-btn']} onClick={() => setOpen(false)}>
          <MdClose />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
}

export default ModalUsage;
