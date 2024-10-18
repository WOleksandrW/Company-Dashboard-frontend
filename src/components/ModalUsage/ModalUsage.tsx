import React from 'react';
import { Modal, IconButton } from '@mui/material';
import { PopupBoxUsage } from '../';

import { MdClose } from 'react-icons/md';

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
      <PopupBoxUsage sx={{ position: 'relative', width: 'min(400px, 100%)' }}>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: '4px', right: '4px', fontSize: '2rem' }}>
          <MdClose />
        </IconButton>
        {children}
      </PopupBoxUsage>
    </Modal>
  );
}

export default ModalUsage;
