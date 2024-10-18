import { Outlet } from 'react-router-dom';
import { Header } from '../../components';

import { Box } from '@mui/material';

function MainLayout() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
    </>
  );
}

export default MainLayout;
