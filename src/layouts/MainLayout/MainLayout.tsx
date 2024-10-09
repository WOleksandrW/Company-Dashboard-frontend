import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <>
      <header className={styles['header']}>
        <h2 className="h2">Header</h2>
      </header>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
