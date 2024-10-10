/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

interface IProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  field?: ControllerRenderProps<any, any>;
}

function TextFieldUsage({ label, type, errorMessage, field }: IProps) {
  return (
    <TextField
      label={label}
      type={type}
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ formHelperText: { sx: { typography: 'body2' } } }}
      {...field}
    />
  );
}

export default TextFieldUsage;
