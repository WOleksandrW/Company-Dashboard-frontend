import { forwardRef, useMemo } from 'react';
import { Paper, PaperProps } from '@mui/material';
import { merge } from 'lodash';

const PopupBoxUsage = forwardRef<HTMLDivElement, PaperProps>(({ children, sx, ...rest }, ref) => {
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
    <Paper ref={ref} sx={sxProps} {...rest}>
      {children}
    </Paper>
  );
});

PopupBoxUsage.displayName = 'PopupBoxUsage';

export default PopupBoxUsage;
