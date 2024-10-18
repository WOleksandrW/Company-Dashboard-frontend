import { useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SxProps, Theme } from '@mui/material';
import { merge } from 'lodash';

interface IProps {
  label: string;
  list: {
    text: string;
    value: string;
  }[];
  hasNone?: boolean;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
}

function SelectUsage({ label, list, hasNone, value, onChange, sx }: IProps) {
  const sxProps = useMemo(() => merge({ maxWidth: 200 }, sx), [sx]);

  return (
    <FormControl sx={sxProps}>
      <InputLabel id={`labe-${label}`}>{label}</InputLabel>
      <Select
        labelId={`labe-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoWidth
        label={label}>
        {hasNone && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {list.map(({ text, value }) => (
          <MenuItem value={value} key={value}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectUsage;
