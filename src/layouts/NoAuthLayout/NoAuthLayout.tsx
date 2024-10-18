import { Outlet } from 'react-router-dom';
import { PopupBoxUsage, WrapperBoxUsage } from '@root/components';

import styles from './NoAuthLayout.module.scss';

function NoAuthLayout() {
  return (
    <WrapperBoxUsage component="section" className={styles['section']}>
      <PopupBoxUsage
        sx={{
          width: 'min(400px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
        <Outlet />
      </PopupBoxUsage>
    </WrapperBoxUsage>
  );
}

export default NoAuthLayout;
