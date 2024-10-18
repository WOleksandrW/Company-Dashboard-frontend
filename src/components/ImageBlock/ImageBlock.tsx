import { Box, SxProps, Theme } from '@mui/material';

import imgPlaceholder from '@root/assets/images/image-placeholder.png';

interface IProps {
  imgSrc?: string;
  altText?: string;
  sx?: SxProps<Theme>;
}

function ImageBlock({ imgSrc, altText, sx }: IProps) {
  return (
    <Box
      className="back2-color"
      sx={{
        maxHeight: '400px',
        maxWidth: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        overflow: 'clip',
        ...sx
      }}>
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
