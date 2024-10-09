import { useMemo } from 'react';

import styles from './Modal.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function Modal({ children, className }: IProps) {
  const classNames = useMemo(() => {
    let str = styles['modal'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return <div className={classNames}>{children}</div>;
}

export default Modal;
