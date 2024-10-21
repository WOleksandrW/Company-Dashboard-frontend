import { useMemo } from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';
import { merge } from 'lodash';

import imgPlaceholder from '@root/assets/images/image-placeholder.png';

interface IProps {
  imgSrc?: string;
  altText?: string;
  sx?: SxProps<Theme>;
}

function ImageBlock({ imgSrc, altText, sx }: IProps) {
  const theme = useTheme();

  const sxProps = useMemo(
    () =>
      merge(
        {
          maxHeight: '400px',
          maxWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
          overflow: 'clip',
          bgcolor: theme.palette.background.default
        },
        sx
      ),
    [sx]
  );

  return (
    <Box sx={sxProps}>
      <Box
        component="img"
        src={imgSrc ?? imgPlaceholder}
        alt={altText}
        sx={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </Box>
  );
}

export default ImageBlock;
