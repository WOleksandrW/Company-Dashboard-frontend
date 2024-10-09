import { useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Button, Input } from '..';

import styles from './AuthForm.module.scss';

interface IProps {
  className?: string;
  submitText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputs: {
    id: string;
    label: string;
    error?: string;
    type?: 'email' | 'password' | 'text';
    placeholder?: string;
    register?: UseFormRegisterReturn;
  }[];
}

function AuthForm({ className, submitText, onSubmit, inputs }: IProps) {
  const classNames = useMemo(() => {
    let str = styles['form'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return (
    <form className={classNames} onSubmit={onSubmit}>
      {inputs.map(({ label, error, ...rest }) => (
        <div className={styles['input-block']} key={rest.id}>
          <label className="p2" htmlFor={rest.id}>
            {label}
          </label>
          <Input {...rest} />
          {error && <p className="p3 fault-color">{error}</p>}
        </div>
      ))}
      <Button>{submitText}</Button>
    </form>
  );
}

export default AuthForm;
