import { ElementType, useMemo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { merge } from 'lodash';

interface IProps extends BoxProps {
  component?: ElementType;
}

function WrapperBoxUsage({ children, component = 'div', sx, ...rest }: IProps) {
  const sxProps = useMemo(
    () =>
      merge(
        {
          paddingY: '20px',
          paddingX: '40px',
          '@media (max-width: 768px)': { paddingX: '32px' },
          '@media (max-width: 500px)': { paddingX: '20px' }
        },
        sx
      ),
    [sx]
  );

  return (
    <Box component={component} sx={sxProps} {...rest}>
      {children}
    </Box>
  );
}

export default WrapperBoxUsage;
