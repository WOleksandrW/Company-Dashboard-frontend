import { useMemo } from 'react';

import styles from './Button.module.scss';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ children, className, ...rest }: IProps) {
  const classNames = useMemo(() => {
    let str = styles['btn'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
}

export default Button;
