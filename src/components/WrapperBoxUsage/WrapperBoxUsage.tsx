import { ElementType } from 'react';
import { Box, BoxProps } from '@mui/material';

interface IProps extends BoxProps {
  component?: ElementType;
}

function WrapperBoxUsage({ children, component = 'div', sx }: IProps) {
  return (
    <Box
      component={component}
      sx={{
        paddingY: '20px',
        paddingX: '40px',
        '@media (max-width: 768px)': { paddingX: '32px' },
        '@media (max-width: 500px)': { paddingX: '20px' },
        ...sx
      }}>
      {children}
    </Box>
  );
}

export default WrapperBoxUsage;
