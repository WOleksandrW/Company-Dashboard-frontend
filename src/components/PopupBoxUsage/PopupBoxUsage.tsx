import { Box, SxProps, Theme } from '@mui/material';

interface IProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

function PopupBoxUsage({ children, sx }: IProps) {
  return (
    <Box
      className="back1-color"
      sx={{
        padding: '20px',
        borderRadius: '20px',
        '@media (max-width: 500px)': { padding: '12px', borderRadius: '12px' },
        ...sx
      }}>
      {children}
    </Box>
  );
}

export default PopupBoxUsage;
