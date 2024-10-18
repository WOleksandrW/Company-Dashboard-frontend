import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';

const PopupBoxUsage = forwardRef<HTMLDivElement, BoxProps>(({ children, sx, ...rest }, ref) => (
  <Box
    ref={ref}
    className="back1-color"
    sx={{
      padding: '20px',
      borderRadius: '20px',
      '@media (max-width: 500px)': { padding: '12px', borderRadius: '12px' },
      ...sx
    }}
    {...rest}>
    {children}
  </Box>
));

PopupBoxUsage.displayName = 'PopupBoxUsage';

export default PopupBoxUsage;
