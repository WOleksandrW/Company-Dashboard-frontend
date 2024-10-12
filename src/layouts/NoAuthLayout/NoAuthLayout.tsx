import { Outlet } from 'react-router-dom';

import styles from './NoAuthLayout.module.scss';

function NoAuthLayout() {
  return (
    <section className={styles['section']}>
      <div className={styles['form-modal']}>
        <Outlet />
      </div>
    </section>
  );
}

export default NoAuthLayout;
