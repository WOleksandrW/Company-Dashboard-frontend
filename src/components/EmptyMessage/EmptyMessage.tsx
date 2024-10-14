import { Box, SxProps, Theme, Typography } from '@mui/material';
import { HiOutlineInbox } from 'react-icons/hi';

interface IProps {
  sx?: SxProps<Theme>;
  className?: string;
  message?: string;
}

function EmptyMessage({ sx, className, message }: IProps) {
  return (
    <Box
      className={className}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', ...sx }}>
      <HiOutlineInbox size={40} />
      <Typography variant="h6">{message ?? 'There are no data'}</Typography>
    </Box>
  );
}

export default EmptyMessage;
