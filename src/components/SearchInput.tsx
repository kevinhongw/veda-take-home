import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

type Props = {
  onSearch: (search: string) => void;
};

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  const handleReset = () => {
    // TODO: Cleaner approach
    setSearch('');
    onSearch('');
  };

  return (
    <Box>
      <TextField size="small" name="search" value={search} onChange={handleChange} />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" color="error" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
};

export default SearchInput;
