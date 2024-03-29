import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import React from 'react';

type Props = {
  name: string;
  options: string[];
  values: string[];
  onChange: (value: string) => void;
};

const Filter: React.FC<Props> = ({ name, options, values, onChange }) => {
  const handleOnChange = (option: string) => {
    onChange(option);
  };

  return (
    <div>
      <Typography variant="h6">{name}</Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox checked={values.includes(option)} onChange={() => handleOnChange(option)} />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default Filter;
