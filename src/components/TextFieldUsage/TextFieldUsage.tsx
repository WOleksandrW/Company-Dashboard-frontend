/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';

interface IProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  field?: ControllerRenderProps<any, any>;
  autoComplete?: string;
  value?: TextFieldProps['value'];
  onChange?: TextFieldProps['onChange'];
  onBlur?: TextFieldProps['onBlur'];
}

function TextFieldUsage({
  label,
  type,
  errorMessage,
  autoComplete,
  field,
  value,
  onChange,
  onBlur
}: IProps) {
  const [isVisible, setIsVisible] = useState(false);

  const inputType = type === 'password' && isVisible ? 'text' : type;

  return (
    <TextField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      type={inputType}
      error={!!errorMessage}
      helperText={errorMessage}
      autoComplete={autoComplete}
      slotProps={{
        formHelperText: { sx: { typography: 'body2' } },
        input: {
          endAdornment:
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  sx={{ typography: 'h2' }}
                  onClick={() => setIsVisible((prev) => !prev)}>
                  {isVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </IconButton>
              </InputAdornment>
            ) : null
        }
      }}
      {...field}
    />
  );
}

export default TextFieldUsage;
