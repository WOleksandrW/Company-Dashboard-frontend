import { Outlet } from 'react-router-dom';
import { Modal } from '../../components';

import styles from './NoAuthLayout.module.scss';

function NoAuthLayout() {
  return (
    <section className={styles['section']}>
      <Modal className={styles['form-modal']}>
        <Outlet />
      </Modal>
    </section>
  );
}

export default NoAuthLayout;
