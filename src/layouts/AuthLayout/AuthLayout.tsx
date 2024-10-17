import { Outlet } from 'react-router-dom';
import { WrapperBoxUsage } from '../../components';

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
