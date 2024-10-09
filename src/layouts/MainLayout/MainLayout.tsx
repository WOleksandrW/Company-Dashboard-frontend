import { Outlet } from 'react-router-dom';
import { Header } from '../../components';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <>
      <Header isAuth={true} />
      <main className={styles['main']}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
