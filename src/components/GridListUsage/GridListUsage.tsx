import { List, SxProps, Theme } from '@mui/material';

interface IProps {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
}

function GridListUsage({ children, sx }: IProps) {
  return (
    <List
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)'
        },
        gap: '12px',
        '@media (max-width: 900px)': {
          width: 'min(600px, 100%)',
          marginX: 'auto'
        },
        '@media (max-width: 600px)': {
          width: 'min(320px, 100%)'
        },
        ...sx
      }}>
      {children}
    </List>
  );
}

export default GridListUsage;
