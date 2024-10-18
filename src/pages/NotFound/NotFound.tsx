import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={NavLink}
        to="/"
        sx={{
          typography: 'body1',
          marginTop: 2,
          padding: '10px 20px'
        }}>
        Go Back to Home
      </Button>
    </Box>
  );
}

export default NotFound;
