/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

type TOptionAutocomplete = {
  description: string;
};

export interface IGMapAutocompleteProps {
  label: string;
  field: ControllerRenderProps<any, any>;
  errorMessage?: string;
}

function GMapAutocomplete({ label, field, errorMessage }: IGMapAutocompleteProps) {
  const { ref: inputRef, onChange, value } = field;
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [options, setOptions] = useState<TOptionAutocomplete[]>([]);

  useEffect(() => {
    setAutocompleteService(new google.maps.places.AutocompleteService());
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, defValue?: string) => {
    const inputValue = event.target.value;

    if (autocompleteService && inputValue) {
      autocompleteService.getPlacePredictions({ input: inputValue }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setOptions(predictions.map((prediction) => ({ description: prediction.description })));
          if (defValue && !predictions.find((predic) => predic.description === defValue)) {
            setOptions((prev) => prev.concat({ description: defValue }));
          }
        } else {
          setOptions(defValue ? [{ description: defValue }] : []);
        }
      });
    } else {
      setOptions(defValue ? [{ description: defValue }] : []);
    }
  };

  useEffect(() => {
    if (autocompleteService) {
      handleInputChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>, value);
    }
  }, [autocompleteService, value]);

  return (
    <Autocomplete
      disablePortal
      options={options}
      getOptionLabel={(option) => option.description}
      onInputChange={(_, newValue) => {
        onChange(newValue);
        // handleInputChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
      }}
      value={options.find((option) => option.description === value) || null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputRef={inputRef}
          error={!!errorMessage}
          helperText={errorMessage}
          slotProps={{ formHelperText: { sx: { typography: 'body2' } } }}
        />
      )}
    />
  );
}

export default GMapAutocomplete;
