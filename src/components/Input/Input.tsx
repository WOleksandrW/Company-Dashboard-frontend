import { useMemo, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

import styles from './Input.module.scss';

interface IProps {
  id?: string;
  className?: string;
  type?: 'email' | 'password' | 'text';
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

function Input({ className, register, type, ...rest }: IProps) {
  const [isVisible, setIsVisible] = useState(false);

  const classNames = useMemo(() => {
    let str = styles['input'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  if (type === 'password') {
    return (
      <div className={styles['input-block']}>
        <input
          className={classNames}
          type={isVisible ? 'text' : 'password'}
          {...rest}
          {...register}
          autoComplete="off"
        />
        <button
          className={styles['eye-btn']}
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
        </button>
      </div>
    );
  }

  return <input className={classNames} type={type} {...rest} {...register} />;
}

export default Input;
