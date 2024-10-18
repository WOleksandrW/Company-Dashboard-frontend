import { forwardRef, useMemo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { merge } from 'lodash';

const PopupBoxUsage = forwardRef<HTMLDivElement, BoxProps>(({ children, sx, ...rest }, ref) => {
  const sxProps = useMemo(
    () =>
      merge(
        {
          padding: '20px',
          borderRadius: '20px',
          '@media (max-width: 500px)': { padding: '12px', borderRadius: '12px' }
        },
        sx
      ),
    [sx]
  );

  return (
    <Box ref={ref} className="back1-color" sx={sxProps} {...rest}>
      {children}
    </Box>
  );
});

PopupBoxUsage.displayName = 'PopupBoxUsage';

export default PopupBoxUsage;
