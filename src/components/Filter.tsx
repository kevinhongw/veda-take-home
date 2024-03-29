import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
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
    <Box>
      <Typography fontWeight={500} fontSize="16px">
        {name}
      </Typography>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            checked={values.includes(option)}
            onChange={() => handleOnChange(option)}
            control={<Checkbox size="small" />}
            label={option}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default Filter;
