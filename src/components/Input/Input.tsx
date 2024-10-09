import { useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './Input.module.scss';

interface IProps {
  id?: string;
  className?: string;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

function Input({ className, register, ...rest }: IProps) {
  const classNames = useMemo(() => {
    let str = styles['input'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return <input className={classNames} {...rest} {...register} />;
}

export default Input;
