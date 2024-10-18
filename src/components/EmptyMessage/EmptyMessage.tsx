import { useMemo } from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { merge } from 'lodash';

import { HiOutlineInbox } from 'react-icons/hi';

interface IProps {
  sx?: SxProps<Theme>;
  className?: string;
  message?: string;
}

function EmptyMessage({ sx, className, message }: IProps) {
  const sxProps = useMemo(
    () =>
      merge({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }, sx),
    [sx]
  );

  return (
    <Box className={className} sx={sxProps}>
      <HiOutlineInbox size={40} />
      <Typography variant="h6">{message ?? 'There are no data'}</Typography>
    </Box>
  );
}

export default EmptyMessage;
