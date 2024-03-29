import { Cancel, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';

type Props = {
  onSearch: (search: string) => void;
};

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onSearch('');
  };

  return (
    <Box>
      <form onSubmit={handleSearch}>
        <TextField
          size="small"
          name="search"
          inputRef={inputRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: !!inputRef.current?.value && (
              <InputAdornment position="end" onClick={handleReset} sx={{ cursor: 'default' }}>
                <Cancel />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default SearchInput;
