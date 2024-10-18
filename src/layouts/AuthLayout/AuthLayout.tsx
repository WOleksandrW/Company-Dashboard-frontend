import { Outlet } from 'react-router-dom';
import { WrapperBoxUsage } from '@root/components';

function AuthLayout() {
  return (
    <WrapperBoxUsage
      component="section"
      sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Outlet />
    </WrapperBoxUsage>
  );
}

export default AuthLayout;
