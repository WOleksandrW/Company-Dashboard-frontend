/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { TextFieldUsage } from '../';

interface IProps {
  submitText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<any>;
  inputs: {
    controlName: string;
    label: string;
    type?: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    autoComplete?: string;
  }[];
}

function AuthForm({ submitText, onSubmit, control, inputs }: IProps) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {inputs.map(({ controlName, ...rest }) => (
        <Controller
          key={controlName}
          name={controlName}
          control={control}
          render={({ field }) => <TextFieldUsage {...rest} field={field} />}
        />
      ))}
      <Button variant="contained" type="submit" sx={{ typography: 'body1', alignSelf: 'center' }}>
        {submitText}
      </Button>
    </Box>
  );
}

export default AuthForm;
